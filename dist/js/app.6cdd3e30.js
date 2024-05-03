(function(){"use strict";var t={765:function(t,e,a){var s=a(5471),i=a(2915),n=a(9491),r=a(5365),o=a(3812),c=a(9555),p=a(5),l=function(){var t=this,e=t._self._c;return e(i.A,[e(n.A,{staticClass:"pl-0 pb-0",attrs:{app:"",color:"dark-gray",dark:""}},[e("div",{staticClass:"d-flex align-center",staticStyle:{height:"inherit","min-width":"700px"}},[e(o.A,{staticClass:"shrink mr-2",attrs:{alt:"Vuetify Logo",src:"images/header-logo.png",transition:"scale-transition",height:"100%",width:"350px"}}),e("span",{staticStyle:{"font-size":"36px","font-family":"OCR A Std, monospace"}},[t._v("HD2 Kit Assembler")])],1),e(p.A),t.storeFaction?e("div",{staticClass:"pl-8 pr-8 d-flex",staticStyle:{"align-self":"end"}},t._l(t.factions,(function(a){return e("div",{key:`selected-faction-${a.id}`,staticClass:"pa-0",style:"cursor: pointer; width: 300px; "+(a.id==t.storeFaction.id?"border-bottom: 3px dashed rgb(200,200,0)":""),attrs:{value:a.id},on:{click:function(e){t.selectedFaction=a}}},[e(o.A,{attrs:{height:"100%",src:`${t.urlPath}${a.tabImage}`}})],1)})),0):t._e(),e(p.A),e(r.A,{staticClass:"mr-2",attrs:{outlined:"",color:"success"},on:{click:function(e){return t.exportStore()}}},[e("span",[t._v("Export")])]),e(r.A,{staticClass:"mr-2",attrs:{outlined:"",color:"primary"},on:{click:function(e){return t.importStore()}}},[e("span",[t._v("Import")])]),e("input",{ref:"uploader",staticClass:"d-none",attrs:{type:"file"},on:{change:t.onFileChanged}}),e(r.A,{attrs:{outlined:"",color:"error"},on:{click:function(e){return t.resetToDefaults()}}},[e("span",[t._v("Reset All Defaults")])])],1),e(c.A,[e("router-view")],1)],1)},d=[],u=a(5353),y={name:"App",created(){this.$vuetify.theme.dark=!0,this.populateDefaults()},computed:{...(0,u.aH)({primaryWeapons:t=>t.equipment.primaryWeapons,secondaryWeapons:t=>t.equipment.secondaryWeapons,supportWeapons:t=>t.equipment.supportWeapons,backpacks:t=>t.equipment.backpacks,grenades:t=>t.equipment.grenades,factions:t=>t.types.factions,storeFaction:t=>t.types.selectedFaction,categories:t=>t.types.categories,urlPath:t=>t.settings.urlPath}),selectedFaction:{get(){return this.storeFaction},set(t){this.$store.dispatch("types/setSelectedFaction",t)}}},data:()=>({isSelecting:!1}),methods:{async populateDefaults(){let t=null,e=null,a=null,s=null,i=null,n=null,r=null;this.$store.dispatch("settings/setUrlPath","");let o="";window.location.href.includes("github.io/")&&(o=window.location.href.split("github.io/")[1],o.includes("?")&&(o=o.split("?")[0]),o.includes("/")&&(o=o.split("/")[0]),o+="/"),this.$store.dispatch("settings/setUrlPath",o),await Promise.all([t=this.fetchJson(`${this.urlPath}defaults/primaryWeapons.json`),e=this.fetchJson(`${this.urlPath}defaults/secondaryWeapons.json`),a=this.fetchJson(`${this.urlPath}defaults/supportWeapons.json`),s=this.fetchJson(`${this.urlPath}defaults/backpacks.json`),i=this.fetchJson(`${this.urlPath}defaults/grenades.json`),n=this.fetchJson(`${this.urlPath}defaults/factions.json`),r=this.fetchJson(`${this.urlPath}defaults/categories.json`)]).then((o=>{[t,e,a,s,i,n,r]=o})),this.updateStore("types","Category",this.categories,r),this.updateStore("types","Faction",this.factions,n),this.updateStore("equipment","PrimaryWeapon",this.primaryWeapons,t),this.updateStore("equipment","SecondaryWeapon",this.secondaryWeapons,e),this.updateStore("equipment","SupportWeapon",this.supportWeapons,a),this.updateStore("equipment","Backpack",this.backpacks,s),this.updateStore("equipment","Grenade",this.grenades,i),this.factions.length&&!this.storeFaction&&this.$store.dispatch("types/setSelectedFaction",this.factions[0])},updateStore(t,e,a,s){if(a&&a.length){const i=s.filter((t=>!a.some((e=>e.id==t.id)))).map((t=>({...t,modified:!1,default:!0})));this.$store.dispatch(`${t}/set${e}Array`,a.concat(i));const n=s.filter((t=>a.some((e=>e.id==t.id&&!e.modified)))).map((t=>({...t,modified:!1,default:!0})));n.forEach((s=>{const i=a.findIndex((t=>t.id==s.id));i>-1&&this.$store.dispatch(`${t}/splice${e}Array`,{data:{...s,modified:!1,default:!0},delete:1,index:i})}))}else this.$store.dispatch(`${t}/set${e}Array`,s.map((t=>({...t,modified:!1,default:!0}))))},async fetchJson(t){const e=await fetch(`/${t}`);return await e.json()},clearStoreData(){this.$store.dispatch("types/clearData"),this.$store.dispatch("equipment/clearData")},resetToDefaults(){confirm("Are you sure? You are about to delete any changes that you made.")&&(this.clearStoreData(),this.populateDefaults())},exportStore(){const t={primaryWeapons:this.primaryWeapons,secondaryWeapons:this.secondaryWeapon,supportWeapons:this.supportWeapons,backpacks:this.backpacks,grenades:this.grenades,categories:this.categories,factions:this.factions},e=JSON.stringify(t),a=new Blob([e],{type:"text/plain"}),s=document.createEvent("MouseEvents"),i=document.createElement("a");i.download="test.json",i.href=window.URL.createObjectURL(a),i.dataset.downloadurl=["text/json",i.download,i.href].join(":"),s.initEvent("click",!0,!1,window,0,0,0,0,0,!1,!1,!1,!1,0,null),i.dispatchEvent(s)},importStore(){this.isSelecting=!0,window.addEventListener("focus",(()=>{this.isSelecting=!1}),{once:!0}),this.$refs.uploader.click()},async onFileChanged(t){let e=new FileReader;e.onload=t=>{const e=JSON.parse(t.target.result);this.clearStoreData(),this.$store.dispatch("equipment/setPrimaryWeaponArray",e.primaryWeapons),this.$store.dispatch("equipment/setSecondaryWeaponArray",e.secondaryWeapons),this.$store.dispatch("equipment/setSupportWeaponArray",e.supportWeapons),this.$store.dispatch("equipment/setBackpackArray",e.backpacks),this.$store.dispatch("equipment/setGrenadeArray",e.grenades),this.$store.dispatch("types/setCategoryArray",e.categories),this.$store.dispatch("types/setFactionArray",e.factions)},e.readAsText(t.target.files[0])}}},h=y,m=a(1656),f=(0,m.A)(h,l,d,!1,null,null,null),g=f.exports,b=a(173),W=function(){var t=this,e=t._self._c;return e("equipment-management-template")},x=[],v=a(793),A=a(5310),k=a(895),S=a(8),C=a(8612),_=function(){var t=this,e=t._self._c;return e(v.A,[e(S.A,{model:{value:t.selectedTab,callback:function(e){t.selectedTab=e},expression:"selectedTab"}},[e(A.A,{key:"equipment"},[t._v(" Equipment ")]),e(A.A,{key:"nominals"},[t._v(" Nominals ")])],1),e(C.A,{model:{value:t.selectedTab,callback:function(e){t.selectedTab=e},expression:"selectedTab"}},[e(k.A,{key:"equipment"},[e("equipment-section")],1),e(k.A,{key:"nominals"},[e("nominals-section")],1)],1)],1)},w=[],E=a(1231),$=a(2369),I=function(){var t=this,e=t._self._c;return e(v.A,[e($.A,{staticClass:"text-center pb-2",staticStyle:{"border-bottom":"dashed gray 1px"}},[e(E.A,{staticClass:"text-h5",attrs:{cols:"12"}},[t._v(" Factions ")]),t._l(t.factions,(function(a){return e(E.A,{key:`faction-raw-${a.id}`,staticStyle:{"border-radius":"5px",border:"1px solid darkgrey"},attrs:{cols:"3"}},[t._v(" "+t._s(a)+" ")])}))],2),e($.A,{staticClass:"text-center pb-2"},[e(E.A,{staticClass:"text-h5",attrs:{cols:"12"}},[t._v(" Categories ")]),t._l(t.categories,(function(a){return e(E.A,{key:`category-raw-${a.id}`,staticStyle:{"border-radius":"5px",border:"1px solid darkgrey"},attrs:{cols:"3"}},[t._v(" "+t._s(a)+" ")])}))],2)],1)},F=[],P={name:"EquipmentManagementTemplate",data:()=>({}),computed:{...(0,u.aH)({factions:t=>t.types.factions,categories:t=>t.types.categories})}},q=P,O=(0,m.A)(q,I,F,!1,null,null,null),T=O.exports,j=function(){var t=this,e=t._self._c;return e(v.A,[e($.A,{staticClass:"text-center pb-2"},[e(E.A,{staticClass:"text-h5",attrs:{cols:"12"}},[t._v(" Primary Weapons ")]),t._l(t.primaryWeapons,(function(t){return e(E.A,{key:`primary-weapon-${t.id}`,attrs:{cols:"3"}},[e("primary-weapon-tile",{attrs:{primaryWeapon:t}})],1)}))],2),e($.A,{staticClass:"text-center pb-2"},[e(E.A,{staticClass:"text-h5",attrs:{cols:"12"}},[t._v(" Secondary Weapons ")]),t._l(t.secondaryWeapons,(function(t){return e(E.A,{key:`secondary-weapon-${t.id}`,attrs:{cols:"3"}},[e("secondary-weapon-tile",{attrs:{secondaryWeapon:t}})],1)}))],2),e($.A,{staticClass:"text-center pb-2"},[e(E.A,{staticClass:"text-h5",attrs:{cols:"12"}},[t._v(" Support Weapons ")]),t._l(t.supportWeapons,(function(t){return e(E.A,{key:`support-weapon-${t.id}`,attrs:{cols:"3"}},[e("support-weapon-tile",{attrs:{supportWeapon:t}})],1)}))],2),e($.A,{staticClass:"text-center pb-2",staticStyle:{"border-bottom":"dashed gray 1px"}},[e(E.A,{staticClass:"text-h5",attrs:{cols:"12"}},[t._v(" Backpacks ")]),t._l(t.backpacks,(function(a){return e(E.A,{key:`backpack-${a.id}`,staticStyle:{"border-radius":"5px",border:"1px solid darkgrey"},attrs:{cols:"3"}},[t._v(" "+t._s(a)+" ")])}))],2),e($.A,{staticClass:"text-center pb-2",staticStyle:{"border-bottom":"dashed gray 1px"}},[e(E.A,{staticClass:"text-h5",attrs:{cols:"12"}},[t._v(" Grenades ")]),t._l(t.grenades,(function(a){return e(E.A,{key:`grenade-${a.id}`,staticStyle:{"border-radius":"5px",border:"1px solid darkgrey"},attrs:{cols:"3"}},[t._v(" "+t._s(a)+" ")])}))],2)],1)},N=[],D=a(6197),J=a(1112),z=function(){var t=this,e=t._self._c;return e("div",{staticClass:"tile hover pa-3",style:`background-image: url('${t.primaryWeapon.imageSource}'); background-size: cover; background-position: top; background-size: 100%; ${t.editing?"":"cursor: pointer;"}`},[e($.A,{staticStyle:{height:"200px"},on:{click:t.handleTileClick}},[e(E.A,{staticStyle:{"text-align":"initial"},attrs:{cols:"5"}},[e("div",{staticClass:"pb-3"},[e("p",{staticClass:"text-h5 mb-0"},[t._v(" "+t._s(t.primaryWeapon.name)+" ")]),e("span",[t._v(t._s(t.primaryWeapon.type))])])]),e(E.A,{attrs:{cols:"7"}},[e("vue-apex-charts",{attrs:{type:"radar",height:"100%",options:t.chartOptions,series:t.series}})],1)],1),e($.A,{directives:[{name:"show",rawName:"v-show",value:t.editing,expression:"editing"}],staticClass:"mt-6",staticStyle:{"border-top":"3px dashed rgb(150,150,0)"}},[e(E.A,{staticClass:"d-flex align-center",attrs:{cols:"6"}},[e("p",{staticClass:"text-h4 mb-0"},[t._v("Capabilities")])]),e(E.A,{staticClass:"d-flex align-center",attrs:{cols:"6"}},[e(r.A,{staticClass:"success mr-2",on:{click:function(e){return t.savePrimaryWeapon()}}},[t._v(" Save ")]),e(r.A,{staticClass:"error",on:{click:function(e){return t.cancelEdit()}}},[t._v(" Cancel ")])],1),t._l(t.categories,(function(a){return e(E.A,{key:`edit-primary-weapon-${t.primaryWeapon.id}-category-${a.id}`,staticClass:"pt-0 pb-0",attrs:{cols:"12"}},[t.weaponCapabilityIndex(a)>-1?e("div",{staticStyle:{display:"flex"}},[e(J.A,{attrs:{right:"","max-width":"350px"},scopedSlots:t._u([{key:"activator",fn:function({on:s,attrs:i}){return[e("span",t._g(t._b({},"span",i,!1),s),[t._v(" "+t._s(a.shortName)+" ")])]}}],null,!0)},[e("span",[t._v(t._s(a.name)+" - "+t._s(a.description.find((e=>e.factionId==t.selectedFaction.id)).text))])]),e(D.A,{staticClass:"ml-4",attrs:{min:"0",max:"5","tick-labels":["0","1","2","3","4","5"],ticks:"always"},model:{value:t.primaryWeaponEdit.stats[t.factionIndex].capabilities[t.weaponCapabilityIndex(a)].value,callback:function(e){t.$set(t.primaryWeaponEdit.stats[t.factionIndex].capabilities[t.weaponCapabilityIndex(a)],"value",e)},expression:"primaryWeaponEdit.stats[factionIndex].capabilities[weaponCapabilityIndex(category)].value"}})],1):t._e()])}))],2)],1)},B=[],G=a(7588),H=a.n(G),M={name:"PrimaryWeaponTile",components:{VueApexCharts:H()},data:()=>({editing:!1,primaryWeaponEdit:null}),props:{primaryWeapon:{type:Object,default:()=>{}}},watch:{primaryWeapon:{immediate:!0,handler(){this.copyPrimaryWeapon()}}},computed:{...(0,u.aH)({categories:t=>t.types.categories,primaryWeapons:t=>t.equipment.primaryWeapons,selectedFaction:t=>t.types.selectedFaction}),factionIndex(){return this.primaryWeaponEdit.stats.findIndex((t=>t.factionId==this.selectedFaction.id))},series(){if(!this.primaryWeaponEdit||!this.primaryWeaponEdit.stats||!this.primaryWeaponEdit.stats.length)return[];let t=[...this.primaryWeaponEdit.stats.find((t=>t.factionId==this.selectedFaction.id)).capabilities];return t=t.sort(((t,e)=>t.id>e.id)),t=t.map((t=>t.value)),[{name:"Series 1",data:t}]},chartOptions(){let t=[...this.categories];t=t.sort(((t,e)=>t.id>e.id)),t=t.map((t=>t.shortName));const e={mode:"dark",chart:{height:200,type:"radar",toolbar:{show:!1}},plotOptions:{radar:{polygons:{strokeColors:"#000000",connectorColors:"#000000",fill:{colors:["rgba(255,255,0,0.1)","rgba(255,255,0,0.2)"]}}}},yaxis:{min:null,max:5,stepSize:1,labels:{show:!1}},xaxis:{categories:t,labels:{show:!0,style:{colors:t.map((()=>"#ffff00")),fontSize:"11px",fontFamily:"Arial",fontWeight:"bold"}}},tooltip:{enabled:!1}};return e}},methods:{copyPrimaryWeapon(){const t=JSON.stringify(this.primaryWeapon);this.primaryWeaponEdit=JSON.parse(t)},weaponCapabilityIndex(t){return this.primaryWeaponEdit?this.primaryWeaponEdit.stats[this.factionIndex].capabilities.findIndex((e=>e.categoryId==t.id)):-1},savePrimaryWeapon(){const t=this.primaryWeapons.findIndex((t=>t.id==this.primaryWeaponEdit.id));this.$store.dispatch("equipment/splicePrimaryWeaponArray",{index:t,delete:1,data:this.primaryWeaponEdit}),this.copyPrimaryWeapon(),this.editing=!1},cancelEdit(){this.copyPrimaryWeapon(),this.editing=!1},handleTileClick(){console.log("handle"),this.editing||(this.editing=!0)}}},U=M,L=(0,m.A)(U,z,B,!1,null,null,null),R=L.exports,V=function(){var t=this,e=t._self._c;return e("div",{staticClass:"tile hover pa-3",style:`background-image: url('${t.secondaryWeapon.imageSource}'); background-size: cover; background-position: top; background-size: 100%; ${t.editing?"":"cursor: pointer;"}`},[e($.A,{staticStyle:{height:"200px"},on:{click:t.handleTileClick}},[e(E.A,{staticStyle:{"text-align":"initial"},attrs:{cols:"5"}},[e("div",{staticClass:"pb-3"},[e("p",{staticClass:"text-h5 mb-0"},[t._v(" "+t._s(t.secondaryWeapon.name)+" ")]),e("span",[t._v(t._s(t.secondaryWeapon.type))])])]),e(E.A,{attrs:{cols:"7"}},[e("vue-apex-charts",{attrs:{type:"radar",height:"100%",options:t.chartOptions,series:t.series}})],1)],1),e($.A,{directives:[{name:"show",rawName:"v-show",value:t.editing,expression:"editing"}],staticClass:"mt-6",staticStyle:{"border-top":"3px dashed rgb(150,150,0)"}},[e(E.A,{staticClass:"d-flex align-center",attrs:{cols:"6"}},[e("p",{staticClass:"text-h4 mb-0"},[t._v("Capabilities")])]),e(E.A,{staticClass:"d-flex align-center",attrs:{cols:"6"}},[e(r.A,{staticClass:"success mr-2",on:{click:function(e){return t.saveSecondaryWeapon()}}},[t._v(" Save ")]),e(r.A,{staticClass:"error",on:{click:function(e){return t.cancelEdit()}}},[t._v(" Cancel ")])],1),t._l(t.categories,(function(a){return e(E.A,{key:`edit-secondary-weapon-${t.secondaryWeapon.id}-category-${a.id}`,staticClass:"pt-0 pb-0",attrs:{cols:"12"}},[t.weaponCapabilityIndex(a)>-1?e("div",{staticStyle:{display:"flex"}},[e(J.A,{attrs:{right:"","max-width":"350px"},scopedSlots:t._u([{key:"activator",fn:function({on:s,attrs:i}){return[e("span",t._g(t._b({},"span",i,!1),s),[t._v(" "+t._s(a.shortName)+" ")])]}}],null,!0)},[e("span",[t._v(t._s(a.name)+" - "+t._s(a.description.find((e=>e.factionId==t.selectedFaction.id)).text))])]),e(D.A,{staticClass:"ml-4",attrs:{min:"0",max:"5","tick-labels":["0","1","2","3","4","5"],ticks:"always"},model:{value:t.secondaryWeaponEdit.stats[t.factionIndex].capabilities[t.weaponCapabilityIndex(a)].value,callback:function(e){t.$set(t.secondaryWeaponEdit.stats[t.factionIndex].capabilities[t.weaponCapabilityIndex(a)],"value",e)},expression:"secondaryWeaponEdit.stats[factionIndex].capabilities[weaponCapabilityIndex(category)].value"}})],1):t._e()])}))],2)],1)},K=[],Y={name:"SecondaryWeaponTile",components:{VueApexCharts:H()},data:()=>({editing:!1,secondaryWeaponEdit:null}),props:{secondaryWeapon:{type:Object,default:()=>{}}},watch:{secondaryWeapon:{immediate:!0,handler(){this.copySecondaryWeapon()}}},computed:{...(0,u.aH)({categories:t=>t.types.categories,secondaryWeapons:t=>t.equipment.secondaryWeapons,selectedFaction:t=>t.types.selectedFaction}),factionIndex(){return this.secondaryWeaponEdit.stats.findIndex((t=>t.factionId==this.selectedFaction.id))},series(){if(!this.secondaryWeaponEdit||!this.secondaryWeaponEdit.stats||!this.secondaryWeaponEdit.stats.length)return[];let t=[...this.secondaryWeaponEdit.stats.find((t=>t.factionId==this.selectedFaction.id)).capabilities];return t=t.sort(((t,e)=>t.id>e.id)),t=t.map((t=>t.value)),[{name:"Series 1",data:t}]},chartOptions(){let t=[...this.categories];t=t.sort(((t,e)=>t.id>e.id)),t=t.map((t=>t.shortName));const e={mode:"dark",chart:{height:200,type:"radar",toolbar:{show:!1}},plotOptions:{radar:{polygons:{strokeColors:"#000000",connectorColors:"#000000",fill:{colors:["rgba(255,255,0,0.1)","rgba(255,255,0,0.2)"]}}}},yaxis:{min:null,max:5,stepSize:1,labels:{show:!1}},xaxis:{categories:t,labels:{show:!0,style:{colors:t.map((()=>"#ffff00")),fontSize:"11px",fontFamily:"Arial",fontWeight:"bold"}}},tooltip:{enabled:!1}};return e}},methods:{copySecondaryWeapon(){const t=JSON.stringify(this.secondaryWeapon);this.secondaryWeaponEdit=JSON.parse(t)},weaponCapabilityIndex(t){return this.secondaryWeaponEdit?this.secondaryWeaponEdit.stats[this.factionIndex].capabilities.findIndex((e=>e.categoryId==t.id)):-1},saveSecondaryWeapon(){const t=this.secondaryWeapons.findIndex((t=>t.id==this.secondaryWeaponEdit.id));this.$store.dispatch("equipment/spliceSecondaryWeaponArray",{index:t,delete:1,data:this.secondaryWeaponEdit}),this.copySecondaryWeapon(),this.editing=!1},cancelEdit(){this.copySecondaryWeapon(),this.editing=!1},handleTileClick(){console.log("handle"),this.editing||(this.editing=!0)}}},Q=Y,X=(0,m.A)(Q,V,K,!1,null,null,null),Z=X.exports,tt=function(){var t=this,e=t._self._c;return e("div",{staticClass:"tile hover pa-3",style:`background-image: url('${t.supportWeapon.imageSource}'); background-size: cover; background-position: top; background-size: 100%; ${t.editing?"":"cursor: pointer;"}`},[e($.A,{staticStyle:{height:"200px"},on:{click:t.handleTileClick}},[e(E.A,{staticStyle:{"text-align":"initial"},attrs:{cols:"5"}},[e("div",{staticClass:"pb-3"},[e("p",{staticClass:"text-h5 mb-0"},[t._v(" "+t._s(t.supportWeapon.name)+" ")]),e("span",[t._v(t._s(t.supportWeapon.type))])])]),e(E.A,{attrs:{cols:"7"}},[e("vue-apex-charts",{attrs:{type:"radar",height:"100%",options:t.chartOptions,series:t.series}})],1)],1),e($.A,{directives:[{name:"show",rawName:"v-show",value:t.editing,expression:"editing"}],staticClass:"mt-6",staticStyle:{"border-top":"3px dashed rgb(150,150,0)"}},[e(E.A,{staticClass:"d-flex align-center",attrs:{cols:"6"}},[e("p",{staticClass:"text-h4 mb-0"},[t._v("Capabilities")])]),e(E.A,{staticClass:"d-flex align-center",attrs:{cols:"6"}},[e(r.A,{staticClass:"success mr-2",on:{click:function(e){return t.saveSupportWeapon()}}},[t._v(" Save ")]),e(r.A,{staticClass:"error",on:{click:function(e){return t.cancelEdit()}}},[t._v(" Cancel ")])],1),t._l(t.categories,(function(a){return e(E.A,{key:`edit-support-weapon-${t.supportWeapon.id}-category-${a.id}`,staticClass:"pt-0 pb-0",attrs:{cols:"12"}},[t.weaponCapabilityIndex(a)>-1?e("div",{staticStyle:{display:"flex"}},[e(J.A,{attrs:{right:"","max-width":"350px"},scopedSlots:t._u([{key:"activator",fn:function({on:s,attrs:i}){return[e("span",t._g(t._b({},"span",i,!1),s),[t._v(" "+t._s(a.shortName)+" ")])]}}],null,!0)},[e("span",[t._v(t._s(a.name)+" - "+t._s(a.description.find((e=>e.factionId==t.selectedFaction.id)).text))])]),e(D.A,{staticClass:"ml-4",attrs:{min:"0",max:"5","tick-labels":["0","1","2","3","4","5"],ticks:"always"},model:{value:t.supportWeaponEdit.stats[t.factionIndex].capabilities[t.weaponCapabilityIndex(a)].value,callback:function(e){t.$set(t.supportWeaponEdit.stats[t.factionIndex].capabilities[t.weaponCapabilityIndex(a)],"value",e)},expression:"supportWeaponEdit.stats[factionIndex].capabilities[weaponCapabilityIndex(category)].value"}})],1):t._e()])}))],2)],1)},et=[],at={name:"SupportWeaponTile",components:{VueApexCharts:H()},data:()=>({editing:!1,supportWeaponEdit:null}),props:{supportWeapon:{type:Object,default:()=>{}}},watch:{supportWeapon:{immediate:!0,handler(){this.copySupportWeapon()}}},computed:{...(0,u.aH)({categories:t=>t.types.categories,supportWeapons:t=>t.equipment.supportWeapons,selectedFaction:t=>t.types.selectedFaction}),factionIndex(){return this.supportWeaponEdit.stats.findIndex((t=>t.factionId==this.selectedFaction.id))},series(){if(!this.supportWeaponEdit||!this.supportWeaponEdit.stats||!this.supportWeaponEdit.stats.length)return[];let t=[...this.supportWeaponEdit.stats.find((t=>t.factionId==this.selectedFaction.id)).capabilities];return t=t.sort(((t,e)=>t.id>e.id)),t=t.map((t=>t.value)),[{name:"Series 1",data:t}]},chartOptions(){let t=[...this.categories];t=t.sort(((t,e)=>t.id>e.id)),t=t.map((t=>t.shortName));const e={mode:"dark",chart:{height:200,type:"radar",toolbar:{show:!1}},plotOptions:{radar:{polygons:{strokeColors:"#000000",connectorColors:"#000000",fill:{colors:["rgba(255,255,0,0.1)","rgba(255,255,0,0.2)"]}}}},yaxis:{min:null,max:5,stepSize:1,labels:{show:!1}},xaxis:{categories:t,labels:{show:!0,style:{colors:t.map((()=>"#ffff00")),fontSize:"11px",fontFamily:"Arial",fontWeight:"bold"}}},tooltip:{enabled:!1}};return e}},methods:{copySupportWeapon(){const t=JSON.stringify(this.supportWeapon);this.supportWeaponEdit=JSON.parse(t)},weaponCapabilityIndex(t){return this.supportWeaponEdit?this.supportWeaponEdit.stats[this.factionIndex].capabilities.findIndex((e=>e.categoryId==t.id)):-1},saveSupportWeapon(){const t=this.supportWeapons.findIndex((t=>t.id==this.supportWeaponEdit.id));this.$store.dispatch("equipment/spliceSupportWeaponArray",{index:t,delete:1,data:this.supportWeaponEdit}),this.copySupportWeapon(),this.editing=!1},cancelEdit(){this.copySupportWeapon(),this.editing=!1},handleTileClick(){console.log("handle"),this.editing||(this.editing=!0)}}},st=at,it=(0,m.A)(st,tt,et,!1,null,null,null),nt=it.exports,rt={name:"EquipmentManagementTemplate",components:{PrimaryWeaponTile:R,SecondaryWeaponTile:Z,SupportWeaponTile:nt},data:()=>({}),computed:{...(0,u.aH)({primaryWeapons:t=>t.equipment.primaryWeapons,secondaryWeapons:t=>t.equipment.secondaryWeapons,supportWeapons:t=>t.equipment.supportWeapons,backpacks:t=>t.equipment.backpacks,grenades:t=>t.equipment.grenades})}},ot=rt,ct=(0,m.A)(ot,j,N,!1,null,null,null),pt=ct.exports,lt={name:"EquipmentManagementTemplate",components:{NominalsSection:T,EquipmentSection:pt},data:()=>({selectedTab:0}),computed:{}},dt=lt,ut=(0,m.A)(dt,_,w,!1,null,null,null),yt=ut.exports,ht={name:"HomeView",components:{EquipmentManagementTemplate:yt}},mt=ht,ft=(0,m.A)(mt,W,x,!1,null,null,null),gt=ft.exports;s.Ay.use(b.Ay);const bt=[{path:"/",name:"home",component:gt},{path:"/raw-data",name:"raw-data",component:function(){return a.e(19).then(a.bind(a,1809))}}],Wt=new b.Ay({mode:"history",base:"/helldivers-versatile-kit/",routes:bt});var xt=Wt,vt=a(6193),At={namespaced:!0,state:()=>({primaryWeapons:[],secondaryWeapons:[],supportWeapons:[],backpacks:[],grenades:[]}),mutations:{storePrimaryWeaponArray(t,e){t.primaryWeapons=e},splicePrimaryWeaponArray(t,e){t.primaryWeapons.splice(e.index,e.delete?e.delete:0,e.data)},storeSecondaryWeaponArray(t,e){t.secondaryWeapons=e},spliceSecondaryWeaponArray(t,e){t.secondaryWeapons.splice(e.index,e.delete?e.delete:0,e.data)},storeSupportWeaponArray(t,e){t.supportWeapons=e},spliceSupportWeaponArray(t,e){t.supportWeapons.splice(e.index,e.delete?e.delete:0,e.data)},storeBackpackArray(t,e){t.backpacks=e},spliceBackpackArray(t,e){t.backpacks.splice(e.index,e.delete?e.delete:0,e.data)},storeGrenadeArray(t,e){t.grenades=e},spliceGrenadeArray(t,e){t.grenades.splice(e.index,e.delete?e.delete:0,e.data)},clearData(t){t.primaryWeapons=[],t.secondaryWeapons=[],t.supportWeapons=[],t.backpacks=[],t.grenades=[]}},actions:{setPrimaryWeaponArray({commit:t},e){t("storePrimaryWeaponArray",e)},splicePrimaryWeaponArray({commit:t},e){t("splicePrimaryWeaponArray",e)},setSecondaryWeaponArray({commit:t},e){t("storeSecondaryWeaponArray",e)},spliceSecondaryWeaponArray({commit:t},e){t("spliceSecondaryWeaponArray",e)},setSupportWeaponArray({commit:t},e){t("storeSupportWeaponArray",e)},spliceSupportWeaponArray({commit:t},e){t("spliceSupportWeaponArray",e)},setBackpackArray({commit:t},e){t("storeBackpackArray",e)},spliceBackpackArray({commit:t},e){t("spliceBackpackArray",e)},setGrenadeArray({commit:t},e){t("storeGrenadeArray",e)},spliceGrenadeArray({commit:t},e){t("spliceGrenadeArray",e)},clearData({commit:t}){t("clearData")}},getters:{}},kt={namespaced:!0,state:()=>({selectedFaction:null,factions:[],categories:[]}),mutations:{storeSelectedFaction(t,e){t.selectedFaction=e},storeFactionArray(t,e){t.factions=e},spliceFactionArray(t,e){t.factions.splice(e.index,e.delete?e.delete:0,e.data)},storeCategoryArray(t,e){t.categories=e},spliceCategoryArray(t,e){t.categories.splice(e.index,e.delete?e.delete:0,e.data)},clearData(t){t.factions=[],t.categories=[]}},actions:{setSelectedFaction({commit:t},e){t("storeSelectedFaction",e)},setFactionArray({commit:t},e){t("storeFactionArray",e)},spliceFactionArray({commit:t},e){t("spliceFactionArray",e)},setCategoryArray({commit:t},e){t("storeCategoryArray",e)},spliceCategoryArray({commit:t},e){t("spliceCategoryArray",e)},clearData({commit:t}){t("clearData")}},getters:{}},St={namespaced:!0,state:()=>({urlPath:""}),mutations:{storeUrlPath(t,e){t.urlPath=e}},actions:{setUrlPath({commit:t},e){t("storeUrlPath",e)}},getters:{}};const Ct=new vt.Ay({storage:window.localStorage});s.Ay.use(u.Ay);var _t=new u.Ay.Store({modules:{equipment:At,types:kt,settings:St},plugins:[Ct.plugin]}),wt=a(7365);s.Ay.use(wt.A);var Et=new wt.A({});s.Ay.config.productionTip=!1,new s.Ay({router:xt,store:_t,vuetify:Et,render:function(t){return t(g)}}).$mount("#app")}},e={};function a(s){var i=e[s];if(void 0!==i)return i.exports;var n=e[s]={exports:{}};return t[s].call(n.exports,n,n.exports,a),n.exports}a.m=t,function(){var t=[];a.O=function(e,s,i,n){if(!s){var r=1/0;for(l=0;l<t.length;l++){s=t[l][0],i=t[l][1],n=t[l][2];for(var o=!0,c=0;c<s.length;c++)(!1&n||r>=n)&&Object.keys(a.O).every((function(t){return a.O[t](s[c])}))?s.splice(c--,1):(o=!1,n<r&&(r=n));if(o){t.splice(l--,1);var p=i();void 0!==p&&(e=p)}}return e}n=n||0;for(var l=t.length;l>0&&t[l-1][2]>n;l--)t[l]=t[l-1];t[l]=[s,i,n]}}(),function(){a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,{a:e}),e}}(),function(){a.d=function(t,e){for(var s in e)a.o(e,s)&&!a.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})}}(),function(){a.f={},a.e=function(t){return Promise.all(Object.keys(a.f).reduce((function(e,s){return a.f[s](t,e),e}),[]))}}(),function(){a.u=function(t){return"js/rawData.2d0c1e61.js"}}(),function(){a.miniCssF=function(t){}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={},e="helldivers-versatile-kit:";a.l=function(s,i,n,r){if(t[s])t[s].push(i);else{var o,c;if(void 0!==n)for(var p=document.getElementsByTagName("script"),l=0;l<p.length;l++){var d=p[l];if(d.getAttribute("src")==s||d.getAttribute("data-webpack")==e+n){o=d;break}}o||(c=!0,o=document.createElement("script"),o.charset="utf-8",o.timeout=120,a.nc&&o.setAttribute("nonce",a.nc),o.setAttribute("data-webpack",e+n),o.src=s),t[s]=[i];var u=function(e,a){o.onerror=o.onload=null,clearTimeout(y);var i=t[s];if(delete t[s],o.parentNode&&o.parentNode.removeChild(o),i&&i.forEach((function(t){return t(a)})),e)return e(a)},y=setTimeout(u.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=u.bind(null,o.onerror),o.onload=u.bind(null,o.onload),c&&document.head.appendChild(o)}}}(),function(){a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){a.p="/helldivers-versatile-kit/"}(),function(){var t={524:0};a.f.j=function(e,s){var i=a.o(t,e)?t[e]:void 0;if(0!==i)if(i)s.push(i[2]);else{var n=new Promise((function(a,s){i=t[e]=[a,s]}));s.push(i[2]=n);var r=a.p+a.u(e),o=new Error,c=function(s){if(a.o(t,e)&&(i=t[e],0!==i&&(t[e]=void 0),i)){var n=s&&("load"===s.type?"missing":s.type),r=s&&s.target&&s.target.src;o.message="Loading chunk "+e+" failed.\n("+n+": "+r+")",o.name="ChunkLoadError",o.type=n,o.request=r,i[1](o)}};a.l(r,c,"chunk-"+e,e)}},a.O.j=function(e){return 0===t[e]};var e=function(e,s){var i,n,r=s[0],o=s[1],c=s[2],p=0;if(r.some((function(e){return 0!==t[e]}))){for(i in o)a.o(o,i)&&(a.m[i]=o[i]);if(c)var l=c(a)}for(e&&e(s);p<r.length;p++)n=r[p],a.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return a.O(l)},s=self["webpackChunkhelldivers_versatile_kit"]=self["webpackChunkhelldivers_versatile_kit"]||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var s=a.O(void 0,[504],(function(){return a(765)}));s=a.O(s)})();
//# sourceMappingURL=app.6cdd3e30.js.map