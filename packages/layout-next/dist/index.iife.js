this.CharrueLayoutNext=function(t){"use strict";var K=Object.defineProperty,q=Object.defineProperties,Z=Object.getOwnPropertyDescriptors,I=Object.getOwnPropertySymbols,G=Object.prototype.hasOwnProperty,J=Object.prototype.propertyIsEnumerable,z=(r,n,e)=>n in r?K(r,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[n]=e,Q=(r,n)=>{for(var e in n||(n={}))G.call(n,e)&&z(r,e,n[e]);if(I)for(var e of I(n))J.call(n,e)&&z(r,e,n[e]);return r},X=(r,n)=>q(r,Z(n));const O="$CharrueLayoutPluginOptions",Y=r=>{const n={};return r==2?n.subMenu="el-submenu":r==3?n.subMenu="el-sub-menu":console.error(`[charrue layout] version ${r} is not supported`),n},ee=/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;function te(r){return ee.test(r)}function R(r){const n=r.split("/").filter(e=>e);return n.map((e,o)=>`/${n.slice(0,o+1).join("/")}`)}function T(r,n=""){return r.map(e=>{let{path:o}=e;if(n=$(n),o&&!te(o)){const a=o[0]==="/";o&&(o=n&&a?o:`${n}/${o}`)}o=$(o);const l=X(Q({},e),{path:o,parentPath:n});return e.children&&(l.children=T(e.children,`${n}/${e.path}`)),l})}function re(r){let n={};const e=l=>{const a=[];return l.forEach(i=>{n[i.path]=i,i.children&&Array.isArray(i.children)&&i.children.length>0&&a.push(...i.children)}),a};let o=e(r);for(;o&&o.length>0;)o=e(o);return n}function $(r){return r.replace(/\/\//g,"/")}function V(r){return typeof r=="function"}function ne(r){for(var n=[],e=0;e<r.length;){var o=r[e];if(o==="*"||o==="+"||o==="?"){n.push({type:"MODIFIER",index:e,value:r[e++]});continue}if(o==="\\"){n.push({type:"ESCAPED_CHAR",index:e++,value:r[e++]});continue}if(o==="{"){n.push({type:"OPEN",index:e,value:r[e++]});continue}if(o==="}"){n.push({type:"CLOSE",index:e,value:r[e++]});continue}if(o===":"){for(var l="",a=e+1;a<r.length;){var i=r.charCodeAt(a);if(i>=48&&i<=57||i>=65&&i<=90||i>=97&&i<=122||i===95){l+=r[a++];continue}break}if(!l)throw new TypeError("Missing parameter name at "+e);n.push({type:"NAME",index:e,value:l}),e=a;continue}if(o==="("){var c=1,u="",a=e+1;if(r[a]==="?")throw new TypeError('Pattern cannot start with "?" at '+a);for(;a<r.length;){if(r[a]==="\\"){u+=r[a++]+r[a++];continue}if(r[a]===")"){if(c--,c===0){a++;break}}else if(r[a]==="("&&(c++,r[a+1]!=="?"))throw new TypeError("Capturing groups are not allowed at "+a);u+=r[a++]}if(c)throw new TypeError("Unbalanced pattern at "+e);if(!u)throw new TypeError("Missing pattern at "+e);n.push({type:"PATTERN",index:e,value:u}),e=a;continue}n.push({type:"CHAR",index:e,value:r[e++]})}return n.push({type:"END",index:e,value:""}),n}function ae(r,n){n===void 0&&(n={});for(var e=ne(r),o=n.prefixes,l=o===void 0?"./":o,a="[^"+b(n.delimiter||"/#?")+"]+?",i=[],c=0,u=0,d="",h=function(f){if(u<e.length&&e[u].type===f)return e[u++].value},C=function(f){var E=h(f);if(E!==void 0)return E;var U=e[u],ze=U.type,Oe=U.index;throw new TypeError("Unexpected "+ze+" at "+Oe+", expected "+f)},g=function(){for(var f="",E;E=h("CHAR")||h("ESCAPED_CHAR");)f+=E;return f};u<e.length;){var m=h("CHAR"),x=h("NAME"),w=h("PATTERN");if(x||w){var s=m||"";l.indexOf(s)===-1&&(d+=s,s=""),d&&(i.push(d),d=""),i.push({name:x||c++,prefix:s,suffix:"",pattern:w||a,modifier:h("MODIFIER")||""});continue}var p=m||h("ESCAPED_CHAR");if(p){d+=p;continue}d&&(i.push(d),d="");var _=h("OPEN");if(_){var s=g(),S=h("NAME")||"",y=h("PATTERN")||"",D=g();C("CLOSE"),i.push({name:S||(y?c++:""),pattern:S&&!y?a:y,prefix:s,suffix:D,modifier:h("MODIFIER")||""});continue}C("END")}return i}function b(r){return r.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function v(r){return r&&r.sensitive?"":"i"}function oe(r,n){if(!n)return r;for(var e=/\((?:\?<(.*?)>)?(?!\?)/g,o=0,l=e.exec(r.source);l;)n.push({name:l[1]||o++,prefix:"",suffix:"",modifier:"",pattern:""}),l=e.exec(r.source);return r}function ie(r,n,e){var o=r.map(function(l){return L(l,n,e).source});return new RegExp("(?:"+o.join("|")+")",v(e))}function le(r,n,e){return se(ae(r,e),n,e)}function se(r,n,e){e===void 0&&(e={});for(var o=e.strict,l=o===void 0?!1:o,a=e.start,i=a===void 0?!0:a,c=e.end,u=c===void 0?!0:c,d=e.encode,h=d===void 0?function(f){return f}:d,C="["+b(e.endsWith||"")+"]|$",g="["+b(e.delimiter||"/#?")+"]",m=i?"^":"",x=0,w=r;x<w.length;x++){var s=w[x];if(typeof s=="string")m+=b(h(s));else{var p=b(h(s.prefix)),_=b(h(s.suffix));if(s.pattern)if(n&&n.push(s),p||_)if(s.modifier==="+"||s.modifier==="*"){var S=s.modifier==="*"?"?":"";m+="(?:"+p+"((?:"+s.pattern+")(?:"+_+p+"(?:"+s.pattern+"))*)"+_+")"+S}else m+="(?:"+p+"("+s.pattern+")"+_+")"+s.modifier;else m+="("+s.pattern+")"+s.modifier;else m+="(?:"+p+_+")"+s.modifier}}if(u)l||(m+=g+"?"),m+=e.endsWith?"(?="+C+")":"$";else{var y=r[r.length-1],D=typeof y=="string"?g.indexOf(y[y.length-1])>-1:y===void 0;l||(m+="(?:"+g+"(?="+C+"))?"),D||(m+="(?="+g+"|"+C+")")}return new RegExp(m,v(e))}function L(r,n,e){return r instanceof RegExp?oe(r,n):Array.isArray(r)?ie(r,n,e):le(r,n,e)}var B={name:"SidebarItem",props:{subMenuComponent:{type:String,default:"el-submenu"},menuItem:{type:Object,required:!0},prefixIconClass:String,menuTextClass:String,route:Boolean}};const ce={class:"charrue-layout-sidebar-el-menu-container"};function de(r,n,e,o,l,a){const i=t.resolveComponent("sidebar-item",!0),c=t.resolveComponent("el-menu-item"),u=t.resolveComponent("router-link");return t.openBlock(),t.createElementBlock("div",ce,[e.menuItem.children&&e.menuItem.children.length>0?(t.openBlock(),t.createBlock(t.resolveDynamicComponent(e.subMenuComponent),{key:0,index:e.menuItem.path,"popper-append-to-body":""},{title:t.withCtx(()=>[t.createElementVNode("div",{class:t.normalizeClass(["submenu-title",e.menuItem.icon?"submenu-title-with-icon":""])},[t.createElementVNode("i",{class:t.normalizeClass(["charrue-sidebar-menu-icon",e.prefixIconClass,e.menuItem.icon])},null,2),t.createElementVNode("span",{class:t.normalizeClass([e.menuTextClass,"charrue-sidebar-menu-text"])},t.toDisplayString(e.menuItem.title),3)],2)]),default:t.withCtx(()=>[(t.openBlock(!0),t.createElementBlock(t.Fragment,null,t.renderList(e.menuItem.children,d=>(t.openBlock(),t.createBlock(i,{key:d.path,route:e.route,"is-nest":!0,menuItem:d,subMenuComponent:e.subMenuComponent},null,8,["route","menuItem","subMenuComponent"]))),128))]),_:1},8,["index"])):(t.openBlock(),t.createElementBlock(t.Fragment,{key:1},[e.route?(t.openBlock(),t.createBlock(u,{key:0,to:e.menuItem.path,class:"menu-router-link"},{default:t.withCtx(()=>[t.createVNode(c,{index:e.menuItem.path},{title:t.withCtx(()=>[t.createElementVNode("span",{class:t.normalizeClass([e.menuTextClass,"charrue-sidebar-menu-text"])},t.toDisplayString(e.menuItem.title),3)]),default:t.withCtx(()=>[t.createElementVNode("i",{class:t.normalizeClass(["charrue-sidebar-menu-icon",e.prefixIconClass,e.menuItem.icon])},null,2)]),_:1},8,["index"])]),_:1},8,["to"])):(t.openBlock(),t.createBlock(c,{key:1,index:e.menuItem.path},{title:t.withCtx(()=>[t.createElementVNode("span",{class:t.normalizeClass([e.menuTextClass,"charrue-sidebar-menu-text"])},t.toDisplayString(e.menuItem.title),3)]),default:t.withCtx(()=>[t.createElementVNode("i",{class:t.normalizeClass(["charrue-sidebar-menu-icon",e.prefixIconClass,e.menuItem.icon])},null,2)]),_:1},8,["index"]))],2112))])}B.render=de,B.__file="layout-internal/libs/SidebarItem.vue";var ue=Object.defineProperty,H=Object.getOwnPropertySymbols,he=Object.prototype.hasOwnProperty,me=Object.prototype.propertyIsEnumerable,W=(r,n,e)=>n in r?ue(r,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[n]=e,j=(r,n)=>{for(var e in n||(n={}))he.call(n,e)&&W(r,e,n[e]);if(H)for(var e of H(n))me.call(n,e)&&W(r,e,n[e]);return r},P={name:"GlobalAside",components:{SidebarItem:B},props:{data:{type:Array,default(){return[]}},collapsed:{type:Boolean,default:!1},logo:String,title:String,route:{type:Boolean,default:!0},absolute:{type:Boolean,default:!1},authorized:Function,sidebarWidth:{type:Array,default(){return[54,200]}},regexToPath:{type:Object},homeUrl:{type:String,default:"/"},subMenuComponent:{type:String}},data(){return{openKeys:[],activeRoutePath:"",menuData:[],menuDataPathMapping:{}}},computed:{width(){return this.collapsed?this.sidebarWidth[0]+"px":this.sidebarWidth[1]+"px"},computedMenuData(){const r=[];return this.menuData.forEach((n,e)=>{const o=this.formatMenuData({menu:n,index:e,deep:0,path:n.path,parent:null});o&&r.push(o)}),r}},watch:{data:{handler(){this.filterAsideMenuData()},immediate:!0,deep:!0}},created(){this.route&&this.$watch("$route.path",r=>{const n=this.regexToPath?Object.keys(this.regexToPath).find(l=>L(l).test(r)):null;n?this.activeRoutePath=this.regexToPath[n]:this.activeRoutePath=r;let e=R(this.activeRoutePath);const o=this.menuDataPathMapping[this.activeRoutePath];o&&o.parentPath&&R(o.parentPath).forEach(l=>{e.includes(l)||e.push(l)}),this.openKeys=e},{immediate:!0})},methods:{filterAsideMenuData(){const r=this.data.filter(n=>n.title&&!n.hide).map(n=>(this.authorized&&this.authorized(n.authority,n),n)).filter(n=>!!n);this.menuData=T(r),this.menuDataPathMapping=re(this.menuData)},_formatMenuData({menu:r,deep:n,index:e,path:o,parent:l}={}){let a=r?j({},r):{};return this.authorized?V(this.authorized)&&!this.authorized({menu:a,deep:n,index:e,path:o,parent:l})?!1:(a.children=a.children||[],Array.isArray(a.children)&&a.children.length>0&&(a.children=a.children.map(i=>{const c=o.startsWith("/")?i.path:`${o}/${i.path}`;return this._formatMenuData({menu:i,deep:n+1,index:e,path:c,parent:a})}).filter(i=>i)),a):a},formatMenuData({menu:r,deep:n,index:e,path:o,parent:l}={}){let a=r?j({},r):{};return this.authorized?V(this.authorized)&&!this.authorized({menu:a,deep:n,index:e,path:o,parent:l})?!1:(a.children=a.children||[],Array.isArray(a.children)&&a.children.length>0&&(a.children=a.children.map(i=>{const c=o.startsWith("/")?i.path:`${o}/${i.path}`;return this.formatMenuData({menu:i,deep:n+1,index:e,path:c,parent:a})}).filter(i=>i)),a):a}}};const fe={class:"charrue-layout-sidebar-container"},pe={key:0,class:"logo-container"},ye=["src"],ge={key:1};function _e(r,n,e,o,l,a){const i=t.resolveComponent("router-link"),c=t.resolveComponent("sidebar-item"),u=t.resolveComponent("el-menu");return t.openBlock(),t.createElementBlock("div",fe,[t.createElementVNode("div",{class:"charrue-layout-sidebar-placeholder",style:t.normalizeStyle({width:a.width})},null,4),t.createElementVNode("div",{class:"charrue-layout-sidebar charrue-layout-sidebar-el-menu-container",style:t.normalizeStyle({width:a.width,position:e.absolute?"absolute":"fixed"})},[e.logo||e.title?(t.openBlock(),t.createElementBlock("div",pe,[t.createVNode(i,{to:e.homeUrl,class:t.normalizeClass(["menu-router-link"])},{default:t.withCtx(()=>[e.logo?(t.openBlock(),t.createElementBlock("img",{key:0,src:e.logo,alt:"logo"},null,8,ye)):t.createCommentVNode("v-if",!0),e.title?(t.openBlock(),t.createElementBlock("h1",ge,t.toDisplayString(e.title),1)):t.createCommentVNode("v-if",!0)]),_:1},8,["to"])])):t.createCommentVNode("v-if",!0),t.renderSlot(r.$slots,"sidebar-top"),t.createVNode(u,{class:"charrue-layout-sidebar-el-menu",mode:"vertical","unique-opened":"",collapse:e.collapsed,"default-active":l.activeRoutePath,"default-openeds":l.openKeys},{default:t.withCtx(()=>[(t.openBlock(!0),t.createElementBlock(t.Fragment,null,t.renderList(a.computedMenuData,d=>(t.openBlock(),t.createBlock(c,{route:e.route,key:d.path,subMenuComponent:e.subMenuComponent,menuItem:d},null,8,["route","subMenuComponent","menuItem"]))),128))]),_:1},8,["collapse","default-active","default-openeds"]),t.renderSlot(r.$slots,"sidebar-bottom")],4)])}P.render=_e,P.__file="layout-internal/libs/LayoutSidebar.vue";var k={name:"Hamburger",props:{isActive:{type:Boolean,default:!1}},emits:["toggle-click"],methods:{toggleClick(){this.$emit("toggle-click",this.isActive)}}};const be=[t.createElementVNode("path",{d:"M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"},null,-1)];function Ce(r,n,e,o,l,a){return t.openBlock(),t.createElementBlock("div",{class:"hamburger-container",onClick:n[0]||(n[0]=(...i)=>a.toggleClick&&a.toggleClick(...i))},[(t.openBlock(),t.createElementBlock("svg",{class:t.normalizeClass([{"is-active":e.isActive},"hamburger-svg"]),viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg",width:"64",height:"64"},be,2))])}k.render=Ce,k.__file="layout-internal/libs/Hamburger.vue";var M={name:"LayoutHeader",components:{Hamburger:k},props:{collapse:{type:Boolean,default:!1},fixed:{type:Boolean,default:!0}},emits:["update:collapse"],methods:{toggleSideBar(){this.$emit("update:collapse",!this.collapse)}}};const xe={class:"charrue-layout-header-main"},we={class:"charrue-layout-header-left"},Ee={class:"charrue-layout-header-right"};function Se(r,n,e,o,l,a){const i=t.resolveComponent("hamburger");return t.openBlock(),t.createElementBlock("div",{class:t.normalizeClass(["charrue-layout-header-container",{"fixed-header":e.fixed}])},[t.createElementVNode("div",xe,[t.createElementVNode("div",we,[t.renderSlot(r.$slots,"header-trigger",{},()=>[t.createVNode(i,{onToggleClick:a.toggleSideBar},null,8,["onToggleClick"])]),t.renderSlot(r.$slots,"header-left")]),t.createElementVNode("div",Ee,[t.renderSlot(r.$slots,"header-right")])])],2)}M.render=Se,M.__file="layout-internal/libs/LayoutHeader.vue";var N={name:"LayoutContent",props:{animation:{type:Boolean,default:!0}}};const Be={class:"charrue-layout-content-container"},Pe={class:"charrue-layout-content-header"},ke={class:"charrue-layout-content-main"},Me={class:"charrue-layout-content-footer"};function Ne(r,n,e,o,l,a){return t.openBlock(),t.createElementBlock("section",Be,[t.createElementVNode("div",Pe,[t.renderSlot(r.$slots,"content-header")]),t.createElementVNode("div",ke,[e.animation?(t.openBlock(),t.createBlock(t.Transition,{key:0,name:"fade-transform",mode:"out-in"},{default:t.withCtx(()=>[t.renderSlot(r.$slots,"content")]),_:3})):t.renderSlot(r.$slots,"content",{key:1})]),t.createElementVNode("div",Me,[t.renderSlot(r.$slots,"content-footer")])])}N.render=Ne,N.__file="layout-internal/libs/LayoutContent.vue";var A={name:"Layout",components:{LayoutSidebar:P,LayoutHeader:M,LayoutContent:N},props:{version:{type:Number,validator(r){return[2,3].indexOf(r)>-1},default:2},collapsed:{type:Boolean,default:!1},fixedHeader:{type:Boolean,default:!0},data:{type:Array,required:!0,default(){return[]}},logo:String,title:String,sidebarWidth:{type:Array,default(){return[54,200]}},animation:{type:Boolean,default:!0},absolute:{type:Boolean,default:!1},route:{type:Boolean,default:!0},authorized:Function,homeUrl:{type:String,default:"/"},regexToPath:{type:Object}},data(){return{innerCollapse:!1,componentConfig:{}}},computed:{mainWidthStyle(){return{width:`calc(100% - ${this.collapsed?this.sidebarWidth[0]:this.sidebarWidth[1]}px)`}},headerWidthStyle(){let r="100%";return this.fixedHeader&&(r=`calc(100% - ${this.collapsed?this.sidebarWidth[0]:this.sidebarWidth[1]}px)`),{width:r}}},watch:{collapsed:{handler(r){this.innerCollapse=r},immediate:!0},innerCollapse(r){this.$emit("update:collapsed",r)}},created(){this.componentConfig=Y(this[O].version||2)},emits:["update:collapsed"]};function Ae(r,n,e,o,l,a){const i=t.resolveComponent("layout-sidebar"),c=t.resolveComponent("layout-header"),u=t.resolveComponent("layout-content");return t.openBlock(),t.createElementBlock("div",{class:t.normalizeClass(["charrue-layout",[e.collapsed?"hideSidebar":"openSidebar"]])},[t.createVNode(i,{collapsed:l.innerCollapse,data:e.data,logo:e.logo,title:e.title,route:e.route,absolute:e.absolute,authorized:e.authorized,sidebarWidth:e.sidebarWidth,homeUrl:e.homeUrl,subMenuComponent:l.componentConfig.subMenu,"regex-to-path":e.regexToPath},{"sidebar-top":t.withCtx(()=>[t.renderSlot(r.$slots,"sidebar-top")]),"sidebar-bottom":t.withCtx(()=>[t.renderSlot(r.$slots,"sidebar-bottom")]),_:3},8,["collapsed","data","logo","title","route","absolute","authorized","sidebarWidth","homeUrl","subMenuComponent","regex-to-path"]),t.createElementVNode("div",{class:"charrue-layout-main",style:t.normalizeStyle(a.mainWidthStyle)},[t.createVNode(c,{collapse:l.innerCollapse,fixed:e.fixedHeader,style:t.normalizeStyle(a.headerWidthStyle),"onUpdate:collapse":n[0]||(n[0]=d=>l.innerCollapse=d)},{"header-trigger":t.withCtx(()=>[t.renderSlot(r.$slots,"header-trigger")]),"header-left":t.withCtx(()=>[t.renderSlot(r.$slots,"header-left")]),"header-right":t.withCtx(()=>[t.renderSlot(r.$slots,"header-right")]),_:3},8,["collapse","fixed","style"]),t.createVNode(u,{animation:e.animation},{"content-header":t.withCtx(()=>[t.renderSlot(r.$slots,"content-header")]),content:t.withCtx(()=>[t.renderSlot(r.$slots,"default")]),"content-footer":t.withCtx(()=>[t.renderSlot(r.$slots,"content-footer")]),_:3},8,["animation"])],4)],2)}A.render=Ae,A.__file="layout-internal/libs/Layout.vue";const F=A,De=O;var Ie={install(r){r.config.globalProperties[De]={version:2},r.component(F.name,F)}};return Ie}(vue);
