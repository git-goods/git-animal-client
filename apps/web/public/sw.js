if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(a[n])return;let r={};const t=e=>s(e,n),d={module:{uri:n},exports:r,require:t};a[n]=Promise.all(i.map((e=>d[e]||t(e)))).then((e=>(c(...e),r)))}}define(["./workbox-01fd22c6"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"d10d9c76b3622d1ec5cefd8da3758177"},{url:"/_next/static/O-IhmJDqmZJLXu9yyvzy7/_buildManifest.js",revision:"c85c1a3efdd19e6b81a6577cbe323549"},{url:"/_next/static/O-IhmJDqmZJLXu9yyvzy7/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1054-d9a80ddfdb6e4959.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/1573-b11330fbbb82ecbd.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/1931-0fc77f53206544cf.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/2045-4e3138414db13dbc.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/227-ec1b0a24a2b2db95.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/2629-7993e060050b693a.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/2655-5f23b4b8d7e4a200.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/29-af142c2630b78fcb.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/3-d9c4bab8d514633a.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/3223-b923526481253a94.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/3285-21c30eee0a363e9b.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/32a073ef-b122f9385e49c507.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/3535-f1ef704f90734c28.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/3597-12e2b78bc28aea89.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/4538-90f6b590d1f705f0.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/4731-ee12dc34e4ed0080.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/5962-732f1fb18ea34b7e.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/5b38a370-d850ac7e051382de.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/6059-471c08244fba47cc.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/6658-5ef9d91d7ed7619f.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/729-7130176c13dc4266.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/7787-aacfde7cb49040b9.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/8469-3232d33e0bf0cfd2.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/880-03a10c1ee8ac100e.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/8852-1d1bb88d967a7f5e.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/9180-44001bcdc83ec7ac.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/9220-a73ea21a83347fad.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/9567-0f3dee87f6ec8f3a.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/9886-4072f437fc47ab7e.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/a8c5ed1a-949aeab5ab6ca8e5.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/auth/layout-9e02d1d7e561fc3d.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/auth/page-c662adf91852ce7c.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/dev/component/page-437ea5382c8003ed.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/dev/page-fd2eada1b0925851.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/dev/token/page-adf2986f5efe52d5.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/error-aa14ead8ced4ba31.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/event/%5BeventCode%5D/layout-cf858414fb49b2c1.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/event/%5BeventCode%5D/page-c437f4f5b990347b.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/guild/(subpage)/%5Bid%5D/@modal/default-71131bdf53503304.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/guild/(subpage)/%5Bid%5D/layout-5c1f2df59953f147.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/guild/(subpage)/%5Bid%5D/page-0701fd3d00e9f68d.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/guild/(subpage)/%5Bid%5D/setting/layout-dcae21b836e9e4d0.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/guild/(subpage)/%5Bid%5D/setting/member/page-ba0bd2d4a13b811d.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/guild/(subpage)/%5Bid%5D/setting/page-4fb745f557bea989.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/guild/(subpage)/%5Bid%5D/setting/pet/page-cef4c413610aa272.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/guild/(subpage)/create/page-e7cd980768b33327.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/guild/(subpage)/detail/%5Bid%5D/join/page-966908f354cb82e9.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/guild/(subpage)/detail/%5Bid%5D/layout-741686631738e641.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/guild/(subpage)/detail/%5Bid%5D/page-769f926659b84da4.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/guild/@modal/(.)detail/%5Bid%5D/join/page-47ceb1ddeca90f77.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/guild/@modal/(.)detail/%5Bid%5D/page-07f231483b3a56ab.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/guild/@modal/default-c84e4e2cee6319c8.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/guild/layout-be9a2e57b72971c9.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/guild/page-fd3e79f25ac26a87.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/laboratory/layout-0994c675c27b6a7a.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/laboratory/page-f6c806aeb5f340ed.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/laboratory/property-pet-sell/page-8a87128bfd6883ac.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/layout-4fa8f203eeb87d25.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/mypage/layout-5fe0e86940712968.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/mypage/my-pet/page-0dd6e63e75d8be7c.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/mypage/page-4b1bd5a21ed35f10.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/not-found-9dcf2de27949fcdf.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/page-9aee3d503724c2dc.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/shop/layout-1825506901e8b56b.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/%5Blocale%5D/shop/page-34f12277e1b64839.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/_not-found/page-21c155a50146abec.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/layout-047987abd02ff5b9.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/app/not-found-9f0bf7000663b15a.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/f93f50d2-68c1fd303dd98024.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/framework-98e1f400f923008f.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/main-app-291bdee0102c37ec.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/main-ea3241778fd560a7.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/pages/_app-71492a600ca5a282.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/pages/_error-c2756f53ff3cfdc3.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-187ef664107e1b5a.js",revision:"O-IhmJDqmZJLXu9yyvzy7"},{url:"/_next/static/css/2aba70c8c1019c9c.css",revision:"2aba70c8c1019c9c"},{url:"/_next/static/css/68f1e846ed9d9262.css",revision:"68f1e846ed9d9262"},{url:"/_next/static/css/9460bf3945d179a0.css",revision:"9460bf3945d179a0"},{url:"/_next/static/media/ProductSans-Black.7f8958ca.woff2",revision:"7f8958ca"},{url:"/_next/static/media/ProductSans-Bold.90ffb4b6.woff2",revision:"90ffb4b6"},{url:"/_next/static/media/ProductSans-Light.abb9af6a.woff2",revision:"abb9af6a"},{url:"/_next/static/media/ProductSans-Medium.00b77508.woff2",revision:"00b77508"},{url:"/_next/static/media/ProductSans-Regular.013b078e.woff2",revision:"013b078e"},{url:"/_next/static/media/ProductSans-Thin.b36663db.woff2",revision:"b36663db"},{url:"/animal-card/card-back-A_PLUS.webp",revision:"17a07cc23b4b575ff60f10ca9cb19c8e"},{url:"/animal-card/card-back-B_MINUS.webp",revision:"8d2aabab84c34f91d3aa021d8832455c"},{url:"/animal-card/card-back-EX.webp",revision:"d82deea60fdc2b2e307fe9952d36827c"},{url:"/animal-card/card-back-S_PLUS.webp",revision:"983d63e90689850efed62231efd8f52a"},{url:"/animal-card/card-bg-A_PLUS.webp",revision:"8ac533c550e04c6f7a182b409b8e10f8"},{url:"/animal-card/card-bg-B_MINUS.webp",revision:"85911b2a19c838946df45e99673734d8"},{url:"/animal-card/card-bg-EX.webp",revision:"fbbeda812860100a01dbba3283036e2b"},{url:"/animal-card/card-bg-S_PLUS.webp",revision:"cc5d4a1bd27d3eab93b230c33d0f342e"},{url:"/animal-card/card-thumbnail-A_PLUS.webp",revision:"99a9c2f8ce9b339c5b59977f16a0f0fb"},{url:"/animal-card/card-thumbnail-B_MINUS.webp",revision:"f4110dd13b516720b56faba434bd4ae0"},{url:"/animal-card/card-thumbnail-EX.webp",revision:"bac01e0b5e6a0db65497c60529e0cada"},{url:"/animal-card/card-thumbnail-S_PLUS.webp",revision:"3e44ca46237837cbed66556f28da145d"},{url:"/animals/GOOSE.png",revision:"81d4fb1e97378fdd27247df68ab32190"},{url:"/animals/LITTLE_CHICK.png",revision:"99d61f09f2b97adc9147a33a26fe192e"},{url:"/animals/PENGUIN.png",revision:"4ceb14b9c7d791ed13a133dce743eff2"},{url:"/animals/PIG.png",revision:"a6cd0fca0bf2b320d7dc28c2e3ee4c45"},{url:"/animals/SLIME_BLUE.png",revision:"615f2f13034b7f1aab61978dd08b92b3"},{url:"/animals/SLIME_GREEN.png",revision:"5a892b63e2400aeba3853b83ea668a49"},{url:"/animals/SLIME_RED.png",revision:"930ed099d92012579d441f0c98aa9d1f"},{url:"/animals/animal-selected.svg",revision:"b2e05909c9af7631b09ffe646525aba2"},{url:"/app-icon.png",revision:"d79abceafff73c5779e1789c7a8d3a20"},{url:"/bg.png",revision:"ee5dad57016d09e7b47862d278b5fa89"},{url:"/common/carousel-inner-right-disabled.png",revision:"7558b7e49ec12165757c1522eb165cd8"},{url:"/common/carousel-inner-right.png",revision:"f8e92a9977bade7df74b822c26361885"},{url:"/event/CHRISTMAS_2024/og-image.png",revision:"71aa9d521708999205673c72eb8965a9"},{url:"/event/CHRISTMAS_2024_STAR_BONUS/og-image.png",revision:"71aa9d521708999205673c72eb8965a9"},{url:"/event/HALLOWEEN_2024/og-image.png",revision:"637a325a9fea561c5f6445e6b1d38979"},{url:"/event/HALLOWEEN_2024_STAR_BONUS/og-image.png",revision:"637a325a9fea561c5f6445e6b1d38979"},{url:"/event/christmas/card-bg-christmas.webp",revision:"208c876e48b2dfd12b3a1dd79b1e81d6"},{url:"/event/christmas/christmas-bg.webp",revision:"68cf1caddfaa0f59452c423fbb73efa1"},{url:"/event/christmas/christmas-icon.webp",revision:"0ff21cb51b20a99840f62e100fbd1937"},{url:"/event/christmas/christmas-logo.svg",revision:"36f7544f439d43afe9387d3ba9e53881"},{url:"/event/christmas/unknown-rate.webp",revision:"91617e6fb28c93b82f5b688b6b855848"},{url:"/event/halloween/card-bg-halloween.webp",revision:"2281b0647894e317da66ffd9922b2faa"},{url:"/event/halloween/halloween-bg.webp",revision:"dba07ebd46f972e3f4e4ba7fc1bd385c"},{url:"/event/halloween/halloween-icon.webp",revision:"18b80fc15ab9b21a84b5a97c18d675c4"},{url:"/event/halloween/halloween-left.webp",revision:"e35ed9170a02a2990af8d5206c660fdb"},{url:"/event/halloween/halloween-right.webp",revision:"b1118c8fc2436915aff7451bb0a1a680"},{url:"/event/halloween/halloween-title.svg",revision:"6f5b1240520638257ea7e29451dfcd14"},{url:"/event/halloween/king-ghost.svg",revision:"1d9111e864c5632b992f07da60bb281f"},{url:"/event/og-image-event.png",revision:"637a325a9fea561c5f6445e6b1d38979"},{url:"/feedback/feedback-profile.png",revision:"888a404ae429bd01a1477d5ff157d5f5"},{url:"/feedback/icon-channeltalk-close.svg",revision:"25d9194921bd792e5e04716f1e30ed5d"},{url:"/feedback/icon-channeltalk-default.svg",revision:"4fa8f470e1393658b09ae25b779b89cc"},{url:"/guild/empty-image.webp",revision:"9e5604624e746cf80fd2ad6328560f93"},{url:"/guild/guild-bg-bottom-house.png",revision:"df3fd2f4c6c76dbe193650083f81a59f"},{url:"/guild/guild-bg-bottom-house.webp",revision:"f022ba1cf848702d9b1c12eef59a1433"},{url:"/guild/guild-bg-bottom.png",revision:"df03dee600d7f121aa393aac2f4cfc92"},{url:"/guild/guild-bg-bottom.webp",revision:"e32214bb558b5683d1160e7bdc758932"},{url:"/guild/init-bg-bottom.png",revision:"9898c2e8c1899614e291be2e1cdefb40"},{url:"/guild/init-bg-bottom.webp",revision:"0380979299a5d244490cc1ac6467240a"},{url:"/icon/check-mono.svg",revision:"e1d9636648d078d61bf075e91515d767"},{url:"/icon/chervon-right.svg",revision:"6369baebe62659a04a4da7e0fae6de7d"},{url:"/icon/circle-arrow-disable.svg",revision:"1e3cb261d4630484d1d0ea12a2265b78"},{url:"/icon/circle-arrow.svg",revision:"4ea9e3a12cef8832be65c532dc4f8c97"},{url:"/icon/github.png",revision:"045a5f4aff1b57cab5f240376d3ab510"},{url:"/icon/github.svg",revision:"4b16e257f136f299ee21e2a4da4ecc76"},{url:"/icon/loading.svg",revision:"381b93a7dcd04eb21aed6d287c972c46"},{url:"/icons/icon-192x192.png",revision:"74aed5d55010b923f7b095cf76e02263"},{url:"/icons/icon-512x512.png",revision:"d79abceafff73c5779e1789c7a8d3a20"},{url:"/layout/gitanimals-string-logo.svg",revision:"8b884f37a379bd422d6a471318c5a632"},{url:"/logo.svg",revision:"fd2984176d51ea3b8fcc84b2d980732f"},{url:"/main/cats.png",revision:"4b98d36f73912ef4eb40bcad0d72772b"},{url:"/main/choose-pet-bg-mobile.webp",revision:"9b4bcc0857c750717194d3057932788f"},{url:"/main/choose-pet-bg-pc.webp",revision:"94e4f22b35f734cd1ff0e371ebe7cff5"},{url:"/main/ducks.png",revision:"b9b368455453ef290e5b5a9bfe12a797"},{url:"/main/gnb_right_logo.svg",revision:"613cefde7c466c66813b0410de0ba046"},{url:"/main/have-pet-way-1.webp",revision:"6a7725422256f07f10379fd46bbca52d"},{url:"/main/have-pet-way-2.webp",revision:"250287a8b3d91b6f66befc5d42134c84"},{url:"/main/mode_demo-farm.png",revision:"ce94294bfad0c1e55b1264d22ba98db9"},{url:"/main/mode_demo-farm.webp",revision:"0ed0102c8c769258c5808aaeff5f82a4"},{url:"/main/mode_demo-line.png",revision:"c1236c18c8841d2c9e1c30aaa635e003"},{url:"/main/mode_demo-line.webp",revision:"f41abc1f1ef6f2d912f702152823330a"},{url:"/main/section1_bg-mobile.webp",revision:"6c88692d8f3e4cc588c4a7016c3735fd"},{url:"/main/section1_bg-pc.webp",revision:"60563a332612e219242c060426022f3d"},{url:"/main/section2_bg-bottom.webp",revision:"becb52c9be66a7f66fd132e22b605ff6"},{url:"/main/section2_bg-top.webp",revision:"d6d9e190900f9447b615e38cd95d416d"},{url:"/manifest.json",revision:"6dcd0ec5375bbb25a1837edcaf40519c"},{url:"/mypage/bg-cloud.webp",revision:"dd4a81a2a501d9edd02d6258f0cfd9e5"},{url:"/mypage/coin.svg",revision:"f473f94893538690a8f4b5f95282a84d"},{url:"/mypage/merge/merge-empty.svg",revision:"acd246ed12a7fa26fb0a1a3472332615"},{url:"/og-image.png",revision:"7f4c5f89361794bc6ba731a1d224a8bb"},{url:"/pets/bbibbi.svg",revision:"f46f842f591ba18bda7a953a8d36df2a"},{url:"/pets/cat.svg",revision:"67619eafbda90d777ca17d7143cba3db"},{url:"/pets/cheese-cat.svg",revision:"5a5ccf828ec3b6d7852aba749bcdf433"},{url:"/pets/flamingo.svg",revision:"d0e873afa7cd98b37ba951bcfacd28ff"},{url:"/pets/galchi-cat.svg",revision:"17c6c39396bfdc3d56905ad37500bd65"},{url:"/pets/goblin-bag.svg",revision:"786d99b81876de6c45e9f2b9cb281fdd"},{url:"/pets/goblin.svg",revision:"bc26e4750cfbe0adfa213db5bf472c95"},{url:"/pets/goose-java.svg",revision:"59424d4197df2211bff3ef84e5c98b4a"},{url:"/pets/goose-js.svg",revision:"3d66593c904a20340dd1d6acc8b14f4f"},{url:"/pets/goose-kotlin.svg",revision:"b28302e3d727e859e33e2de726587080"},{url:"/pets/goose-linux.svg",revision:"74fe4c29a6cad0561ecfe62198ed1ea6"},{url:"/pets/goose-node.svg",revision:"e786bae351c752f936a50e1323437256"},{url:"/pets/goose-spring.svg",revision:"0174c917380105dcd51c73d92c95c0a3"},{url:"/pets/goose-sunglasses.svg",revision:"d3b75cb3418622286bfa1c7f8fcf65bb"},{url:"/pets/goose-swift.svg",revision:"ae9873c0f93edd0085d24156038b1b0f"},{url:"/pets/goose.svg",revision:"e34aeb92f7726d355f58d2921eff469c"},{url:"/pets/little-chick-java.svg",revision:"37fee076635d8373face91dfb3adb364"},{url:"/pets/little-chick-js.svg",revision:"dab62347822e42ebd50d97562a8ab7c0"},{url:"/pets/little-chick-kotlin.svg",revision:"f4bf0550c62685dfb997b63e5f33af2d"},{url:"/pets/little-chick-linux.svg",revision:"1f823a315b84cf6e8a6963b8b14b7905"},{url:"/pets/little-chick-node.svg",revision:"6a424138f4a67d266c5356413468697a"},{url:"/pets/little-chick-spring.svg",revision:"8f0f32141629dfc37741ff0484d63b66"},{url:"/pets/little-chick-sunglasses.svg",revision:"e8edb720063cb9d35c3c0d29112e6bd5"},{url:"/pets/little-chick-swift.svg",revision:"4f45837233aa1edf6ca59dfbcfd6acba"},{url:"/pets/little-chick.svg",revision:"ac076c8b3b05ced012fcbf188d45956b"},{url:"/pets/logo.svg",revision:"75440aced34b08f056bb8a8d5ba095af"},{url:"/pets/penguin-java.svg",revision:"6b1d6f54256032a33599d81d8896ae6c"},{url:"/pets/penguin-js.svg",revision:"ce473793a532e663b1520c79e676d8a8"},{url:"/pets/penguin-kotlin.svg",revision:"b9af54b8776e793a826ed70939a2596d"},{url:"/pets/penguin-linux.svg",revision:"5f6404a24de05fe8ba3ed4c1aebfceee"},{url:"/pets/penguin-node.svg",revision:"85012812e78565baf5e075aeff6acea8"},{url:"/pets/penguin-spring.svg",revision:"6b71c5d3965a5bdb46412339fb037063"},{url:"/pets/penguin-sunglasses.svg",revision:"3c23ce136cf2468dc75e94360b14ec69"},{url:"/pets/penguin-swift.svg",revision:"dd15e62f2e030efe434966b19e9455e2"},{url:"/pets/penguin.svg",revision:"db9f0ae4d54ca0294ab40e25b6cbfe34"},{url:"/pets/pets.svg",revision:"13681cbed208325796ac2741c90583f2"},{url:"/pets/pig-java.svg",revision:"ac41f82739a4be69b93db52f600fa6ee"},{url:"/pets/pig-js.svg",revision:"1a91836ef420232dd88fbcb249a259d1"},{url:"/pets/pig-kotlin.svg",revision:"51764eac4fd23fcd822e8b15839e9e2c"},{url:"/pets/pig-linux.svg",revision:"e6f278384d65811c7c6b987ffad712b8"},{url:"/pets/pig-node.svg",revision:"122786ac6b95ad177ad302b369dc9817"},{url:"/pets/pig-spring.svg",revision:"6ac6ab547f2532422cb0be760ef52786"},{url:"/pets/pig-sunglasses.svg",revision:"d7151555d003bb91811ba79d2ed0a7bb"},{url:"/pets/pig-swift.svg",revision:"d4e0253b16aca355d2f60ebf2df521d1"},{url:"/pets/pig.svg",revision:"5a43fa587bd312c0006c2d34f2e3380a"},{url:"/pets/sample.svg",revision:"8c913a1468b7ac4dd4b783d4156fea86"},{url:"/pets/slime-blue.svg",revision:"50bb8fac2bf978813c9699ab7604bd9a"},{url:"/pets/slime-green.svg",revision:"a59611793c5441ff7c38496806382c19"},{url:"/pets/slime-red-java.svg",revision:"551422132becab71afb03d0fb9f071da"},{url:"/pets/slime-red-js.svg",revision:"ba6b22f4a8cae56b83ce81ca374ecd73"},{url:"/pets/slime-red-kotlin.svg",revision:"59f05f807f1a30ec3a03629f262c70a7"},{url:"/pets/slime-red-linux.svg",revision:"8c4d635d6a33945a938697b9646de329"},{url:"/pets/slime-red-node.svg",revision:"e8e4173ade31183dc0eba45cfe8dc263"},{url:"/pets/slime-red-swift.svg",revision:"9fc10e11f9bced8b91d4bab779607baf"},{url:"/pets/slime-red.svg",revision:"a3b7670c998eee8c01281b618729f76a"},{url:"/pets/ten-mm.svg",revision:"15d032bf9493ed0e12bb0cf3f0afc7dc"},{url:"/pets/white-cat.svg",revision:"c31edd7c6fd0d0471c9feb886e6f459e"},{url:"/preview-image.png",revision:"6eecca29d3fc6235ad07b06f2d1ed0e9"},{url:"/primary-button-bg.png",revision:"4073ea80428c88c2f100fce0efdd3895"},{url:"/primary-button-bg.svg",revision:"b6d5d5695a7ff923138f673f4a350835"},{url:"/shop/carrot.webp",revision:"5a2dca2e97258a5559a64f2841ce6a71"},{url:"/shop/cat.png",revision:"780f8cb5d6822561755a599483f7b4c2"},{url:"/shop/coin.webp",revision:"8fcc15c21915bdaef96ba29579cd2c07"},{url:"/shop/gotcha-list.png",revision:"954038de100ce6e79f2ec446d160b211"},{url:"/shop/gotcha-point-message.svg",revision:"cbe3a6b6014337ef2e5669c0c3fa69f1"},{url:"/shop/gotcha.svg",revision:"9467e9ce58f5347f9e2e003fce8c0277"},{url:"/shop/land-m.webp",revision:"910be5edc859c2835c374c8716e782aa"},{url:"/shop/land.webp",revision:"80bb27d440b6eb51666656eaaf381e99"},{url:"/shop/pet-box-bg.svg",revision:"f65d83af456d4f52a5ed66b56962a896"},{url:"/shop/pet-gotcha-bg-m.webp",revision:"691d08fd3b2539baa8586ecf1c1a4dc5"},{url:"/shop/pet-gotcha-bg.webp",revision:"4e3bd68d40b6085c738183d5a99709fd"},{url:"/shop/pet-gotcha-image-card.webp",revision:"af0d9af16f3bd832199c5a0d9a0f952c"},{url:"/shop/points.svg",revision:"15c378987e094ed732e7eba011287153"},{url:"/shop/press.svg",revision:"9561c1b4bdf0deaa7c54a1b1cc5dc223"},{url:"/shop/shop-bg.svg",revision:"5559eec987d8896ddbd835cb05016728"},{url:"/shop/shop-border.svg",revision:"cdf03b535442e615628df412f7308cce"},{url:"/shop/table-bg-row.png",revision:"4a204720a54ab025168e488c8aa63ab4"},{url:"/shop/table-bg.png",revision:"cb7525b91f9422ee320e52c38404c622"},{url:"/snackbar-bg.png",revision:"4f340dc823b6b084ae78a5f3a283a025"},{url:"/teammate/devxb.webp",revision:"76eb9cd58d006ae0f5f2449771e92345"},{url:"/teammate/hyesungoh.webp",revision:"c50251797bd47c688c8a104e92f2f174"},{url:"/teammate/jiwoo.webp",revision:"00900b031f019a4165e78c8130112c3e"},{url:"/teammate/sumi.webp",revision:"7796cdd9354f83ad6e0f2de4ea7dcc77"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:i})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
