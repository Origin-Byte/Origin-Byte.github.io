"use strict";

hljs.registerLanguage('move', (hljs) => {
  return {
    name: 'Rust',
    aliases: [ 'rs' ],
    keywords: {
      $pattern: hljs.IDENT_RE + '!?',
      type: [
        "u8",
        "u64",
        "u128",
        "u256",
        "vector",
        "address",
        "bool"
      ],
      keyword: [
        "abort",
        "acquires",
        "as",
        "break",
        "continue",
        "copy",
        "drop",
        "key",
        "store",
        "define",
        "else",
        "false",
        "fun",
        "if",
        "invariant",
        "let",
        "loop",
        "module",
        "move",
        "mut",
        "native",
        "public",
        "const",
        "return",
        "spec",
        "struct",
        "true",
        "use",
        "while"
      ],
      literal: ["true", "false"]
    },
    illegal: '</',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.COMMENT('/\\*', '\\*/', { contains: [ 'self' ] }),
      hljs.inherit(hljs.QUOTE_STRING_MODE, {
        begin: /b?"/,
        illegal: null
      }),
      {
        className: 'string',
        variants: [
          { begin: /b?r(#*)"(.|\n)*?"\1(?!#)/ },
          { begin: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/ }
        ]
      },
      {
        className: 'symbol',
        begin: /'[a-zA-Z_][a-zA-Z0-9_]*/
      },
      {
        className: "number",
        variants: [{
            begin: "\\b0x([A-Fa-f0-9_]+)"
        }, {
            begin: "\\b([0-9]+)(u(8|64|128|256))?"
        }],
        relevance: 0
      },
      {
        className: "function",
        beginKeywords: "fun",
        end: "(\\(|<)",
        excludeEnd: !0,
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      {
        className: "class",
        beginKeywords: "struct resource module",
        end: "{",
        contains: [hljs.inherit(hljs.UNDERSCORE_TITLE_MODE, {
            endsParent: !0
        })],
        illegal: "[\\w\\d]"
      }
    ]
  };
});