"use strict";

const StreamJson = async (lista) => {

  if(lista.includes('http')) lista = 'https://cors-anywhere.herokuapp.com/' + lista;
  let req = await fetch(lista);
  let res = await req.text();

  var tv = (m) => {
       var clean_url = (url) => {
          if(/\.mp4/.test(url)){
            url = url.split('.mp4')[0] + '.mp4';
          } else if(/\.m3u8/.test(url)){
            url = url.split('.m3u8')[0] + '.m3u8';
          }
          return decodeURIComponent(url);
       };
       if(/tvg/.test(m)){
          var fake = document.createElement('div');
          if(!m.includes(',')) return false;
          var s = m.split(',');
          if(!s[1].includes('http')) return false;
          var s1 = s[1].split('http');
          var title = '<p stream="http'+s1[1]+'"'+s[0]+'>'+s1[0]+'</p>';
          fake.innerHTML = title;
          var node = fake.childNodes[0];
          var data = {
             title: node.innerHTML.trim(),
             desc: node.getAttribute('group-title') || 'Nao possui Descriçao',
             url: node.getAttribute('stream').replace('https', 'http'),
             icon: node.getAttribute('tvg-logo') || ''
          };
          data.url = clean_url(data.url);
          data.url = (data.url.split('.').pop() === "mp4") ? data.url : 'https://cors-anywhere.herokuapp.com/' + data.url;
          data.icon = (data.icon.includes('https')) ? data.icon.replace('https', 'http') : data.icon;
          data.title = data.title.replace(/[(.*)]/gim, '');
          return data;
       }else{
         return false;
       }
  };

  let ptt = new RegExp('m3u8', 'gim');
  var parse = res.replace(ptt, 'm3u8 :$:')
                  .split(':$:')
                  .map(m => m.trim())
                  .join('')
                  .split('#EXTINF:-1')
                  .filter(m => m.includes('m3u8') || m.includes('mp4'))
                  .map(m => {
                      var mk = tv(m);
                      if(mk){
                        return mk;
                      }
                    })
                  .filter(o => o !== undefined);

  return parse;

};