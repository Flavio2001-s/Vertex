self.addEventListener('install',function(){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim());});
self.addEventListener('push',function(e){
  var d={};try{d=e.data?e.data.json():{};}catch(x){}
  e.waitUntil(self.registration.showNotification(d.title||'Vertex Calendar',{body:d.body||'',tag:d.tag||'jr',icon:'icon-v2.png',badge:'icon-v2.png',data:{url:d.url||'junior.html'}}));
});
self.addEventListener('notificationclick',function(e){
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(l){
    for(var i=0;i<l.length;i++){ if('focus' in l[i]) return l[i].focus(); }
    return self.clients.openWindow(new URL('junior.html',self.registration.scope).href);
  }));
});
