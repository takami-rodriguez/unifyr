use html5ever::{tendril::TendrilSink, Attribute};
use markup5ever_rcdom::{Handle, NodeData, RcDom};
use std::{collections::HashMap, error::Error, path::PathBuf};
use walkdir::WalkDir;

const ROOT: &str = std::env!("FRONTEND");

fn main() -> Result<(), Box<dyn Error>> {
    let mut forms: HashMap<String, Vec<BuildForm>> = HashMap::new();

    for entry in WalkDir::new(ROOT).into_iter().filter_map(|e| e.ok()) {
        let path = entry.into_path();

        if path
            .extension()
            .is_none_or(|ext| !ext.eq_ignore_ascii_case("html"))
        {
            continue;
        }

        let bytes = std::fs::read(&path)?;
        let page_forms = extract_form_data(bytes.as_slice());

        let mut web_path = PathBuf::from("/");
        web_path.push(path.with_file_name("").strip_prefix(ROOT)?);

        forms.insert(web_path.to_string_lossy().to_string(), page_forms);
    }

    for form in forms {
        println!("{:?}", form);
    }

    Ok(())
}

fn walk<F>(handle: &Handle, f: &mut F)
where
    F: FnMut(&Handle),
{
    f(handle);
    for child in handle.children.borrow().iter() {
        walk(child, f);
    }
}

fn extract_form_data(mut bytes: &[u8]) -> Vec<BuildForm> {
    let dom = html5ever::parse_document(RcDom::default(), Default::default())
        .from_utf8()
        .read_from(&mut bytes)
        .unwrap();

    let mut forms: Vec<BuildForm> = vec![];

    walk(&dom.document, &mut |node| {
        if let NodeData::Element { name, attrs, .. } = &node.data {
            if name.local.as_ref() == "form" {
                let mut inputs = vec![];
                let attrs = attrs.borrow();
                let id = get_attr(&attrs, "data-form-id")
                    .expect("form id is required")
                    .to_owned();

                let children = node.children.borrow();
                for child in children.iter() {
                    if let NodeData::Element { name, attrs, .. } = &child.data {
                        let attrs = attrs.borrow();
                        let element_name = name.local.as_ref();
                        match element_name {
                            "input" | "textarea" | "select" => {
                                let name = get_attr(&attrs, "name")
                                    .expect("name is required")
                                    .to_owned();

                                let required = get_attr(&attrs, "required").is_some();
                                let input = BuildInput { name, required };
                                inputs.push(input);
                            }
                            _ => {}
                        }
                    }
                }

                let form = BuildForm { id, inputs };
                forms.push(form);
            }
        }
    });

    forms
}

fn get_attr<'a>(attrs: &'a Vec<Attribute>, name: &str) -> Option<&'a str> {
    attrs
        .iter()
        .find(|attr| attr.name.local.as_ref().eq_ignore_ascii_case(name))
        .map(|attr| attr.value.as_ref())
}

#[derive(Debug)]
struct BuildForm {
    id: String,
    inputs: Vec<BuildInput>,
}

#[derive(Debug)]
struct BuildInput {
    name: String,
    required: bool,
}
