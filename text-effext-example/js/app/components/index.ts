import Alpine from "alpinejs";

// @ts-ignore
const componentsImports = import.meta.glob(["./*.ts", "!./_*.ts"], {
    eager: true,
  });
  export function defineComponent(setup: (...args: any[]) => any) {
    return function (...args: any[]) {
      const result = setup(...args);
      if (result.rootBindings) {
        const orignalInit = result.init
          
          result.init = function () {
            this.$root.setAttribute('x-bind', 'rootBindings')
            orignalInit?.call(this)
          }
      }
      return result
    }
  }
  export default function components() {
    for (const [filename, module] of Object.entries(componentsImports)) {
      const name = filename.replace("./", "").replace(".ts", "");
      const data = (module as any).default;
      Alpine.data(name, data);
    }
  }