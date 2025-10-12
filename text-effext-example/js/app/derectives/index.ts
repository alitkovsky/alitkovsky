import AlpineInstance from "alpinejs";
import { attrStartsWith } from "../utils/functions";
import {
    AlpineDirective
} from "./AlpineDirective";
// @ts-ignore
const directivesImports = import.meta.glob(["./x-*.ts"], {
    eager: true,
});

export default function directives() {
    const elementsWithDirectives = attrStartsWith("*", "x-");
    elementsWithDirectives.forEach((el) => {
        if (!el.getAttribute("x-data") && !el.closest("[x-data]")) {
            el.setAttribute("x-data", "");
        }
    });
    /**
     * Register components here
     */
    for (const [filename, module] of Object.entries(directivesImports)) {
        const name = filename.replace("./x-", "").replace(".ts", "");
        const directive = (module as any).default;
        if (directive.prototype instanceof AlpineDirective) {
            AlpineInstance.directive(name, (element, params, utilities) => {
                try {
                    let instance = new directive(element, params, utilities);
                    /**
                     * Note: On appelle create ici, et pas directement dans le constructeur parce que si on appelle
                     * create dans le constructeur, les propriétés de classes définies pendant la méthode create sautent.
                     * On ne sait pas pourquoi ça fait ça.
                     */
                    const createResult = instance.create?.()
                    if ((createResult as any) instanceof Promise) {
                        console.warn(`Warn: Directive create method can't be async. In directive ${instance.params.type}.`)
                    }
                    utilities.cleanup(() => {
                        instance = null;
                    })
                } catch (e) {
                    console.error(`Error while initializing directive ${name}`, e);
                }
            });
        }
    }
}
