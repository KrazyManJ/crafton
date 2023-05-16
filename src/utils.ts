export function minecraftColorsToHTML(txt: string){
    const COLORS = {
        "0": "#000000", 
        "1": "#0000AA", 
        "2": "#00AA00", 
        "3": "#00AAAA",
        "4": "#AA0000", 
        "5": "#AA00AA", 
        "6": "#FFAA00", 
        "7": "#AAAAAA",
        "8": "#555555", 
        "9": "#5555FF", 
        "a": "#55FF55", 
        "b": "#55FFFF",
        "c": "#FF5555", 
        "d": "#FF55FF", 
        "e": "#FFFF55", 
        "f": "#FFFFFF"
    };
    const FORMATS = {
        "l": "font-weight: bold",
        "m": "text-decoration: line-though",
        "o": "font-style: italic",
    }
    const COL_REGEX = /(&[0-9a-f])((?:(?!&[0-9a-f]).)*)/gmsi
    const FORM_REGEX = /(&[lmno])((?:(?!&[lmno]).)*)/gmsi

    const fct = (text:string , reg: RegExp, prefix: string, map: Record<string,string>, f?: (v: string) => string ) => 
        text.replace(reg,(_,code:string,val:string) => 
            `<span style="${prefix}${map[code.substring(1)]}">${f ? f(val) : val}</span>`
        )
    

    return fct(txt,COL_REGEX,"color:",COLORS,(v)=>fct(v,FORM_REGEX,"",FORMATS)) 
}


interface CreateElOptions {
    text?: string,
    cls?: string | string[],
    attribs?: Record<string,string>,
    css?: Record<string,string>,
    parent?: Node,
    children?: Node[]
}

export function createEl<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: CreateElOptions): HTMLElementTagNameMap[K] {
    const elem = document.createElement(tagName)
    if (options){
        if (options.text) elem.innerText = options.text
        if (options.cls) {
            if (Array.isArray(options.cls)) elem.classList.add(...options.cls)
            else elem.classList.add(options.cls)
        }
        if (options.attribs) Object.keys(options.attribs).forEach(k => elem.setAttribute(k,options.attribs[k]))
        if (options.css) Object.keys(options.css).forEach(k => elem.style.setProperty(k,options.css[k]))
        if (options.parent) options.parent.appendChild(elem)
        if (options.children) options.children.forEach(ch => elem.appendChild(ch))
    }
    return elem
}