use common::{Attr, FormElement, Forms};
use html5ever::{tendril::TendrilSink, Attribute};
use markup5ever_rcdom::{Handle, NodeData, RcDom};
use regex::Regex;
use std::{
    borrow::Cow, collections::HashMap, env, error::Error, fs::File, io::Write, path::PathBuf, sync::LazyLock
};
use walkdir::WalkDir;

const ROOT: &str = std::env!("FRONTEND");

fn walk<F>(handle: &Handle, f: &mut F)
where
    F: FnMut(&Handle),
{
    f(handle);
    for child in handle.children.borrow().iter() {
        walk(child, f);
    }
}

fn main() -> Result<(), Box<dyn Error>> {
    let mut forms: Forms = HashMap::new();

    for entry in WalkDir::new(ROOT).into_iter().filter_map(|e| e.ok()) {
        let path = entry.into_path();

        if path
            .extension()
            .is_none_or(|ext| !ext.eq_ignore_ascii_case("html"))
        {
            continue;
        }

        let bytes = std::fs::read(&path)?;
        collect_forms(&mut forms, bytes.as_slice());
    }

    let out = PathBuf::from(env::var("OUT_DIR").unwrap());
    let dest = out.join("forms.bin");

    let ser = bincode::serialize(&forms).unwrap();
    let mut file = File::create(&dest).unwrap();
    file.write_all(&ser)?;

    Ok(())
}

fn collect_forms(forms: &mut Forms, mut bytes: &[u8]) {
    let dom = html5ever::parse_document(RcDom::default(), Default::default())
        .from_utf8()
        .read_from(&mut bytes)
        .unwrap();

    walk(&dom.document, &mut |node| {
        if let NodeData::Element { name, attrs, .. } = &node.data {
            if name.local.as_ref() == "form" {
                let mut elements: Vec<FormElement> = vec![];

                let attrs = attrs.borrow();
                let id = get_attr(&attrs, "id")
                    .and_then(get_form_id)
                    .expect("form id is required")
                    .to_owned()
                    .into();

                walk(node, &mut |node| {
                    if let NodeData::Element { name, attrs, .. } = &node.data {
                        match name.local.as_ref() {
                            "input" | "textarea" | "select" => {
                                let attrs = attrs.borrow();
                                let name_pos = attrs
                                    .iter()
                                    .position(|a| {
                                        a.name.local.as_ref().eq_ignore_ascii_case("name")
                                    })
                                    .expect("name is required");

                                let name = attrs
                                    .get(name_pos)
                                    .unwrap()
                                    .value
                                    .as_ref()
                                    .to_owned()
                                    .into();

                                let attrs: Vec<_> = [&attrs[..name_pos], &attrs[(name_pos + 1)..]]
                                    .concat()
                                    .iter()
                                    .filter_map(|Attribute { name, value }| {
                                        let name = name.local.as_ref();
                                        if !["class", "style"].contains(&name) {
                                            Some(Attr {
                                                name: name.to_owned().into(),
                                                value: value.as_ref().to_owned().into(),
                                            })
                                        } else {
                                            None
                                        }
                                    })
                                    .collect();

                                elements.push(FormElement { name, attrs });
                            }
                            _ => {}
                        }
                    }
                });

                forms.insert(id, Cow::Owned(elements));
            }
        }
    });
}

fn get_attr<'a>(attrs: &'a Vec<Attribute>, name: &str) -> Option<&'a str> {
    attrs
        .iter()
        .find(|attr| attr.name.local.as_ref().eq_ignore_ascii_case(name))
        .map(|attr| attr.value.as_ref())
}

fn get_form_id<'a>(id: &'a str) -> Option<&'a str> {
    static RE: LazyLock<Regex> = LazyLock::new(|| Regex::new(r"^(\d+)$").unwrap());
    RE.captures(id)
        .and_then(|c| c.get(1))
        .map(|m| m.as_str())
}
