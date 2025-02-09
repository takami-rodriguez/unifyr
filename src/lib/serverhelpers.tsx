"use server"
import { gradientText } from "@/data/styleHelpers";


export async function renderTitleHtml(string:string, highlight:string) {
    const {renderToString} = (await import('react-dom/server')).default;
    return string.replace(
      new RegExp(`\\b${highlight}\\b`, "i"),
      (match) =>
       renderToString(
          <span style={gradientText}>{match}</span>,
        ),
    );
  }