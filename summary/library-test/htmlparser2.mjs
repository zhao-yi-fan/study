import * as htmlparser2 from "htmlparser2";
import mustache from "mustache";

const parser = new htmlparser2.Parser({
  onopentag(name, attributes) {
    const tokens = mustache.parse(name);
    console.log("name:", name, "tokens: ", tokens);
    console.log("onopentag: ", arguments);
    if (name === "script" && attributes.type === "text/javascript") {
      console.log("JS! Hooray!");
    }
  },

  ontext(text) {
    /*
     * Fires whenever a section of text was processed.
     *
     * Note that this can fire at any point within text and you might
     * have to stitch together multiple pieces.
     */
    console.log("-->", text);
  },
  onclosetag(tagname) {
    /*
     * Fires when a tag is closed.
     *
     * You can rely on this event only firing when you have received an
     * equivalent opening tag before. Closing tags without corresponding
     * opening tags will be ignored.
     */
    console.log("close tag: ", tagname);
    if (tagname === "script") {
      console.log("That's it?!");
    }
  },
  oncomment: function (comment) {
    /*
     * Fires when a comment is encountered.
     */
    console.log("comment: ", comment);
  },
});
const vueStr = `<br id="1"/><div! class="tabBox">你好，我是{{name}}</div!><br id="2"/>`;
parser.write(vueStr);
parser.end();
