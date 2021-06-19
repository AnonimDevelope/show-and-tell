import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import Table from "editorjs-table";

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 2,
      cols: 3,
    },
  },
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  raw: Raw,
  header: Header,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
};
