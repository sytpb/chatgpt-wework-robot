

export default class debug {
  
      constructor() {
      }
  
      static stack() {

        const e = new Error();
        const regex = /\/([^\/]+\.*):(\d+):(\d+)/;
        const match = regex.exec(e.stack.split("\n")[3]);

        return {
          name:   match[1],
          line:   match[2],
          column: match[3]
        };
      }
  
      static log(...info) {

        const s = this.stack();
        const name = s.name; 
        const line = s.line;
        console.log(`<${name}:${line}>`, ...info);
      }

      static out(...info) {
        console.log(...info);
      }
  }

  

