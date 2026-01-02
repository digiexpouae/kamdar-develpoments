(function(){
    var script = {
 "shadow": false,
 "horizontalAlign": "left",
 "children": [
  "this.MainViewer",
  "this.MapViewer",
  "this.ThumbnailList_9EF12029_8807_EDE3_41D2_02902F7923F7",
  "this.IconButton_9D5C347E_B630_A7AF_41E2_6088D35D702D",
  "this.IconButton_9A06AD7E_B630_A1AF_4194_A3A38EECE93C"
 ],
 "scrollBarVisible": "rollOver",
 "vrPolyfillScale": 0.5,
 "width": "100%",
 "scrollBarMargin": 2,
 "id": "rootPlayer",
 "start": "this.init(); this.syncPlaylists([this.ThumbnailList_9EF12029_8807_EDE3_41D2_02902F7923F7_playlist,this.mainPlayList]); this.playList_DB63C492_E561_A0FC_41C7_A562898B597C.set('selectedIndex', 0)",
 "backgroundPreloadEnabled": true,
 "desktopMipmappingEnabled": false,
 "borderSize": 0,
 "propagateClick": false,
 "scripts": {
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "unregisterKey": function(key){  delete window[key]; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getKey": function(key){  return window[key]; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "existsKey": function(key){  return key in window; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "registerKey": function(key, value){  window[key] = value; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } }
 },
 "paddingRight": 0,
 "defaultVRPointer": "laser",
 "minHeight": 20,
 "downloadEnabled": false,
 "verticalAlign": "top",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "height": "100%",
 "contentOpaque": false,
 "class": "Player",
 "gap": 10,
 "paddingBottom": 0,
 "minWidth": 20,
 "paddingTop": 0,
 "mouseWheelEnabled": true,
 "scrollBarColor": "#000000",
 "borderRadius": 0,
 "overflow": "visible",
 "data": {
  "name": "Player43899"
 },
 "mobileMipmappingEnabled": false,
 "scrollBarOpacity": 0.5,
 "definitions": [{
 "label": "2BR 06_Post",
 "id": "panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_F7A1B3EC_E4E6_E024_41D7_507820483E95",
  "this.overlay_F7A193EC_E4E6_E024_41E2_6E64E2273FD4"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57",
   "x": 643.85,
   "class": "PanoramaMapLocation",
   "angle": 176.62,
   "y": 1060.25
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_t.jpg",
 "partial": false,
 "hfovMax": 130,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "backwardYaw": -98.05,
   "class": "AdjacentPanorama",
   "yaw": -2.36,
   "distance": 1,
   "panorama": "this.panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88"
  },
  {
   "backwardYaw": -35.45,
   "class": "AdjacentPanorama",
   "yaw": 175.9,
   "distance": 1,
   "panorama": "this.panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "camera_DF714610_E561_A3FD_41DF_AD04AA10DDB0",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 125,
  "yaw": -136.68,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "label": "2BR 03_Post",
 "id": "panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_F71D04F9_E4E3_A02C_41DF_7336BBC977EE",
  "this.overlay_F71D24F9_E4E3_A02C_41DE_BEF5C2A3BCBD",
  "this.overlay_F71DC4F9_E4E3_A02C_41D8_B2BE33695032",
  "this.overlay_F71D84F9_E4E3_A02F_41C6_E2B45A402000"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57",
   "x": 580.52,
   "class": "PanoramaMapLocation",
   "angle": 86.68,
   "y": 392.93
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_t.jpg",
 "partial": false,
 "hfovMax": 130,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "backwardYaw": 26.83,
   "class": "AdjacentPanorama",
   "yaw": 169.75,
   "distance": 1,
   "panorama": "this.panorama_F7E00372_E4EE_603D_41EA_A612E89349F8"
  },
  {
   "backwardYaw": 112.74,
   "class": "AdjacentPanorama",
   "yaw": -131.65,
   "distance": 1,
   "panorama": "this.panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE"
  },
  {
   "backwardYaw": -77.9,
   "class": "AdjacentPanorama",
   "yaw": -0.02,
   "distance": 1,
   "panorama": "this.panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD"
  }
 ]
},
{
 "class": "MapPlayer",
 "buttonZoomIn": "this.IconButton_9D5C347E_B630_A7AF_41E2_6088D35D702D",
 "viewerArea": "this.MapViewer",
 "movementMode": "constrained",
 "buttonZoomOut": "this.IconButton_9A06AD7E_B630_A1AF_4194_A3A38EECE93C",
 "id": "MapViewerMapPlayer"
},
{
 "label": "2BR 12_Post",
 "id": "panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_094FAD41_7961_017A_41A5_5EC6BB97C4CD"
 ],
 "class": "Panorama",
 "partial": false,
 "pitch": 0,
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9_t.jpg",
 "hfovMax": 130,
 "vfov": 180
},
{
 "class": "PanoramaCamera",
 "id": "camera_DA80A551_E561_A07F_41EB_A52B0B0E1A81",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 112,
  "yaw": -13.57,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DF92865F_E561_A064_41D0_D54CA02B2484",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": 102.1,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "label": "1B 08_Post",
 "id": "panorama_45C96C3F_7761_09E9_41D5_F0245B35D131",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_45C96C3F_7761_09E9_41D5_F0245B35D131_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_45C96C3F_7761_09E9_41D5_F0245B35D131_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_45C96C3F_7761_09E9_41D5_F0245B35D131_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_45C96C3F_7761_09E9_41D5_F0245B35D131_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_45C96C3F_7761_09E9_41D5_F0245B35D131_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_45C96C3F_7761_09E9_41D5_F0245B35D131_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_45C96C3F_7761_09E9_41D5_F0245B35D131_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_45C96C3F_7761_09E9_41D5_F0245B35D131_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_45C96C3F_7761_09E9_41D5_F0245B35D131_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_45C96C3F_7761_09E9_41D5_F0245B35D131_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_45C96C3F_7761_09E9_41D5_F0245B35D131_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_45C96C3F_7761_09E9_41D5_F0245B35D131_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_45C96C3F_7761_09E9_41D5_F0245B35D131_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_45C96C3F_7761_09E9_41D5_F0245B35D131_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_45C96C3F_7761_09E9_41D5_F0245B35D131_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_45C96C3F_7761_09E9_41D5_F0245B35D131_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_45C96C3F_7761_09E9_41D5_F0245B35D131_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_45C96C3F_7761_09E9_41D5_F0245B35D131_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_45C96C3F_7761_09E9_41D5_F0245B35D131_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_05AE418B_7AA7_010D_4177_28091F2F0994"
 ],
 "class": "Panorama",
 "partial": false,
 "pitch": 0,
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_45C96C3F_7761_09E9_41D5_F0245B35D131_t.jpg",
 "hfovMax": 130,
 "vfov": 180
},
{
 "class": "PanoramaCamera",
 "id": "camera_DE04B6C4_E561_A065_41CF_D0BEC6044906",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 124,
  "yaw": 48.35,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DFACE658_E561_A06C_41D4_4F2DF91DCE62",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 124,
  "yaw": -67.26,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "label": "1B 02_Post",
 "id": "panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_CE06460A_C107_93A3_41CA_22EE09173271",
  "this.overlay_CE06660A_C107_93A3_41E1_BF3D03C89ECF",
  "this.overlay_CE06260A_C107_93A3_41D3_26C2397488F3"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C",
   "x": 595.59,
   "class": "PanoramaMapLocation",
   "angle": 145.28,
   "y": 1021.12
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_t.jpg",
 "partial": false,
 "hfovMax": 138,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7"
  },
  {
   "backwardYaw": 4.03,
   "class": "AdjacentPanorama",
   "yaw": 115.64,
   "distance": 1,
   "panorama": "this.panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE"
  },
  {
   "backwardYaw": -150.32,
   "class": "AdjacentPanorama",
   "yaw": -34.21,
   "distance": 1,
   "panorama": "this.panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 125,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DB8694C9_E561_A06C_41DB_EF8E9914C98B",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 125,
  "yaw": -104.83,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PlayList",
 "id": "mainPlayList",
 "items": [
  "this.PanoramaPlayListItem_DB60A492_E561_A0FC_41E4_590F03BDC67C",
  "this.PanoramaPlayListItem_DB612492_E561_A0FC_41C0_3EAADAED92A5",
  "this.PanoramaPlayListItem_DB61A493_E561_A0FC_41E5_619103A433D9",
  {
   "media": "this.panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_camera"
  },
  "this.PanoramaPlayListItem_DB6C4493_E561_A0FC_41CA_D60DE1546A75",
  "this.PanoramaPlayListItem_DB6C2493_E561_A0FC_41E9_7C6B0F09BD0E",
  "this.PanoramaPlayListItem_DB6D5493_E561_A0FC_41E0_55CB4490B97C",
  "this.PanoramaPlayListItem_DB6D2493_E561_A0FC_41D9_208782DC8FFA",
  "this.PanoramaPlayListItem_DB6DA494_E561_A0E4_4191_C1271C29E903",
  "this.PanoramaPlayListItem_DB6A3494_E561_A0E4_41D0_07D6C8C4C22B",
  {
   "media": "this.panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E_camera"
  },
  "this.PanoramaPlayListItem_DB6B3494_E561_A0E4_41D2_B6C43E2BE11E",
  "this.PanoramaPlayListItem_DB6B8494_E561_A0E4_41E8_2FC6330DD649",
  {
   "media": "this.panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_camera"
  },
  "this.PanoramaPlayListItem_DB68F494_E561_A0E4_41DF_4AFE6B4AA31F",
  "this.PanoramaPlayListItem_DB697495_E561_A0E4_41EC_20B7533EBA82",
  "this.PanoramaPlayListItem_DB69F495_E561_A0E4_41E5_9AF45D78D12D",
  "this.PanoramaPlayListItem_DB561495_E561_A0E4_41CB_2C05F74268E8",
  "this.PanoramaPlayListItem_DB568495_E561_A0E4_41D3_2CC263D1A8F4",
  "this.PanoramaPlayListItem_DB570495_E561_A0E4_41A3_EA030ED2750F",
  "this.PanoramaPlayListItem_DB578495_E561_A0E4_41E4_0A5BC5660E7F",
  "this.PanoramaPlayListItem_DB541496_E561_A0E4_41EB_2005B78111AA",
  "this.PanoramaPlayListItem_DB571496_E561_A0E4_41D2_51CE0DB63CB3",
  "this.PanoramaPlayListItem_DB57E496_E561_A0E4_41D1_23E8FEB07209",
  "this.PanoramaPlayListItem_DB541496_E561_A0E4_41DB_5A8D0DDA7002",
  {
   "media": "this.panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9_camera"
  },
  "this.PanoramaPlayListItem_DB554496_E561_A0E4_4197_6AE12177A61F",
  {
   "media": "this.panorama_CED91950_C103_71BF_41E5_9F31733A8E82",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_CED91950_C103_71BF_41E5_9F31733A8E82_camera"
  },
  {
   "media": "this.panorama_45C96C3F_7761_09E9_41D5_F0245B35D131",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_45C96C3F_7761_09E9_41D5_F0245B35D131_camera"
  },
  {
   "media": "this.panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B_camera"
  },
  {
   "media": "this.panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B_camera"
  },
  "this.PanoramaPlayListItem_DB537497_E561_A0E4_41E1_245984BE007C",
  "this.PanoramaPlayListItem_DB53F497_E561_A0E4_41C6_1139AB55C533"
 ]
},
{
 "label": "1B 07_Post",
 "id": "panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_CE1BCC90_C107_70BF_41D1_B1506214D710",
  "this.overlay_CE1B8C91_C107_70A1_41E0_DCD0BB6FD940",
  "this.overlay_CE147C91_C107_70A1_41D0_AD1B438E3C65"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C",
   "x": 216.39,
   "class": "PanoramaMapLocation",
   "angle": 94.34,
   "y": 1105.39
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_t.jpg",
 "partial": false,
 "hfovMax": 150,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A"
  },
  {
   "backwardYaw": 75.17,
   "class": "AdjacentPanorama",
   "yaw": -102.14,
   "distance": 1,
   "panorama": "this.panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7"
  },
  {
   "backwardYaw": 115.64,
   "class": "AdjacentPanorama",
   "yaw": 4.03,
   "distance": 1,
   "panorama": "this.panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "camera_DBE864E6_E561_A024_41DB_FA31DCC1837D",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 9.75,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "panorama_D131A6F6_C107_9063_41B9_504D378B08B6_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 125,
  "yaw": -23.64,
  "pitch": 2.58
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 122,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DFC36698_E561_A0EC_41BF_B442A88A45EB",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": -55.3,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "label": "1B 06_Post",
 "id": "panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_CEB39EF7_C106_F062_41D2_51BD9485AABD"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C",
   "x": 177.18,
   "class": "PanoramaMapLocation",
   "angle": -28.41,
   "y": 837.56
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_t.jpg",
 "partial": false,
 "hfovMax": 130,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "backwardYaw": -67.85,
   "class": "AdjacentPanorama",
   "yaw": -141.18,
   "distance": 1,
   "panorama": "this.panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 125,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DA10E50A_E561_A1EC_41CE_6C1B319FF3EC",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": 38.82,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "maximumZoomFactor": 1.2,
 "label": "P-1BHK-P",
 "id": "map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C",
 "initialZoomFactor": 1,
 "overlays": [
  "this.overlay_E5BCFE44_C102_B3A7_41D1_EDF1930D9049",
  "this.overlay_E5BB0E44_C102_B3A7_41E7_F0C8FCF49F28",
  "this.overlay_E5BB3E44_C102_B3A7_41CF_5364FC4FF30F",
  "this.overlay_E5BB5E44_C102_B3A7_41D8_393F8D3AA9D3",
  "this.overlay_E5BB4E44_C102_B3A7_41B1_B3B8362AA147",
  "this.overlay_E5BB6E44_C102_B3A7_41CA_3342DDD43ABF",
  "this.overlay_E5BB8E44_C102_B3A7_41DD_242E478B2931",
  "this.overlay_E5BBBE44_C102_B3A7_41C6_B812A1392411",
  "this.overlay_E9BF7B10_C106_91BE_41DC_3A8A2997C0B0"
 ],
 "thumbnailUrl": "media/map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C_t.jpg",
 "image": {
  "levels": [
   {
    "url": "media/map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C.jpeg",
    "width": 1350,
    "class": "ImageResourceLevel",
    "height": 1800
   },
   {
    "url": "media/map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C_lq.jpeg",
    "width": 221,
    "class": "ImageResourceLevel",
    "tags": "preload",
    "height": 295
   }
  ],
  "class": "ImageResource"
 },
 "fieldOfViewOverlayOutsideColor": "#000000",
 "fieldOfViewOverlayInsideOpacity": 0.41,
 "width": 1350,
 "class": "Map",
 "fieldOfViewOverlayRadiusScale": 0.14,
 "fieldOfViewOverlayOutsideOpacity": 0,
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "scaleMode": "fit_inside",
 "minimumZoomFactor": 0.5,
 "height": 1800
},
{
 "class": "PlayList",
 "id": "playList_DB63E492_E561_A0FC_41D3_C962ACB63025",
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57",
   "class": "MapPlayListItem",
   "player": "this.MapViewerMapPlayer"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "camera_DF7AB618_E561_A3EC_41DC_3E124F0249F7",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 126,
  "yaw": 5.3,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DFF5C675_E561_A024_4184_E3AF3FB4D7A9",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 125,
  "yaw": 93.76,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 133,
  "yaw": -12.17,
  "pitch": -1.64
 },
 "automaticRotationSpeed": 40
},
{
 "label": "1B 09_Post",
 "id": "panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_AD498ACA_BAB7_2046_41E4_384B67950040"
 ],
 "class": "Panorama",
 "partial": false,
 "pitch": 0,
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B_t.jpg",
 "hfovMax": 130,
 "vfov": 180
},
{
 "class": "PanoramaCamera",
 "id": "panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 124,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DF4DA642_E561_A05D_41E6_4D096A5B833E",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": -5.16,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PlayList",
 "id": "playList_DB63A492_E561_A0FC_41CF_B77903E4B838",
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_EA313A8B_E4E2_60EC_41D7_1B2B5A51BF47",
   "class": "MapPlayListItem",
   "player": "this.MapViewerMapPlayer"
  }
 ]
},
{
 "label": "2BR 05_Post",
 "id": "panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_F0B1DAC4_E4E1_A065_41B1_D156AABCB506",
  "this.overlay_F0B1CAC4_E4E1_A065_41AB_D3D020030D89",
  "this.overlay_F928E64A_E522_E06C_41EC_65DFEAC0F19F"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57",
   "x": 448.49,
   "class": "PanoramaMapLocation",
   "angle": 239.77,
   "y": 953.65
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_t.jpg",
 "partial": false,
 "hfovMax": 130,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "backwardYaw": 100.79,
   "class": "AdjacentPanorama",
   "yaw": -37.96,
   "distance": 1,
   "panorama": "this.panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88"
  },
  {
   "backwardYaw": -164.2,
   "class": "AdjacentPanorama",
   "yaw": 81.18,
   "distance": 1,
   "panorama": "this.panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8"
  },
  {
   "backwardYaw": 8.57,
   "class": "AdjacentPanorama",
   "yaw": 133.37,
   "distance": 1,
   "panorama": "this.panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "camera_DA75C519_E561_A1EC_41E9_97C30C8A9B3F",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -52.56,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "label": "1B 03_Post",
 "id": "panorama_D131A6F6_C107_9063_41B9_504D378B08B6",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_D13196F6_C107_9063_41B1_2EC552194353",
  "this.overlay_D13176F6_C107_9063_41E0_DD4095379778",
  "this.overlay_E2AAE677_C10E_F061_41A6_755D2FAFCA63"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C",
   "x": 565.3,
   "class": "PanoramaMapLocation",
   "angle": 73.8,
   "y": 827.13
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_t.jpg",
 "partial": false,
 "hfovMax": 130,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "backwardYaw": 100.31,
   "class": "AdjacentPanorama",
   "yaw": -80.64,
   "distance": 1,
   "panorama": "this.panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0"
  },
  {
   "backwardYaw": -67.08,
   "class": "AdjacentPanorama",
   "yaw": -150.74,
   "distance": 1,
   "panorama": "this.panorama_DEC2337E_C11F_B062_41D0_887443DF32B4"
  },
  {
   "backwardYaw": -86.24,
   "class": "AdjacentPanorama",
   "yaw": 9.21,
   "distance": 1,
   "panorama": "this.panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "camera_DF77C609_E561_A3EC_4191_4484F1DD7A22",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 125,
  "yaw": 17.45,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DFE02682_E561_A0DC_41DE_247E27DFE132",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 125,
  "yaw": -4.1,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DF98A666_E561_A024_41D8_CCA8ED6AA1A1",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -79.69,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PlayList",
 "id": "playList_DB630492_E561_A0FC_41E8_7E9DBBEE0E9C",
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_EA52A3BF_E4E2_A024_41DD_9E951667780A",
   "class": "MapPlayListItem",
   "player": "this.MapViewerMapPlayer"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "camera_DA646520_E561_A1DC_41DE_C463EC526FC7",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 119,
  "yaw": -175.97,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 126,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DE1E26BD_E561_A024_41DC_1C656ADFFCDB",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 125,
  "yaw": 136.49,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DBBF74AA_E561_A02C_41E1_A6A6CAEB2C6E",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": -137.48,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DBE644DE_E561_A065_41E9_DA7C83E762BE",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 122,
  "yaw": -64.17,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DFC9269F_E561_A0E4_41E3_F9C399903276",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": -55.3,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DBAA04BA_E561_A02C_41EA_330D19953E28",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 124,
  "yaw": -10.25,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "label": "2BR 04_Post",
 "id": "panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_F73B5E31_E4E3_A03C_4170_7E0D35969260",
  "this.overlay_F73B7E31_E4E3_A03C_41EA_CD6FB084B8FC",
  "this.overlay_F73B1E31_E4E3_A03C_41E1_768103C826AF",
  "this.overlay_F73B0E31_E4E3_A03C_41D2_7C66F0A2D5A8",
  "this.overlay_F73B3E36_E4E3_A024_4197_80704C598DBD"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57",
   "x": 458.92,
   "class": "PanoramaMapLocation",
   "angle": 175.22,
   "y": 675.9
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_t.jpg",
 "partial": false,
 "hfovMax": 130,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "backwardYaw": 43.32,
   "class": "AdjacentPanorama",
   "yaw": 173.56,
   "distance": 1,
   "panorama": "this.panorama_F7E00372_E4EE_603D_41EA_A612E89349F8"
  },
  {
   "backwardYaw": -174.7,
   "class": "AdjacentPanorama",
   "yaw": -108.44,
   "distance": 1,
   "panorama": "this.panorama_F0FF423F_E4E6_6024_41CC_312C315119C2"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F"
  },
  {
   "backwardYaw": 133.37,
   "class": "AdjacentPanorama",
   "yaw": 8.57,
   "distance": 1,
   "panorama": "this.panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B"
  },
  {
   "backwardYaw": -164.97,
   "class": "AdjacentPanorama",
   "yaw": 166.43,
   "distance": 1,
   "panorama": "this.panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 125,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DA4A2535_E561_A027_41C7_59CD32E3E46A",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": 94.01,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "label": "CO 02_Post",
 "id": "panorama_CED91950_C103_71BF_41E5_9F31733A8E82",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_CED9F950_C103_71BF_41D2_90BF3AB8531E",
  "this.overlay_CED99950_C103_71BF_41E7_612C363AA03C"
 ],
 "class": "Panorama",
 "pitch": 0,
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_t.jpg",
 "partial": false,
 "hfovMax": 130,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4"
  }
 ]
},
{
 "maximumZoomFactor": 1.2,
 "label": "P-LO",
 "id": "map_EA52A3BF_E4E2_A024_41DD_9E951667780A",
 "initialZoomFactor": 1,
 "overlays": [
  "this.overlay_EA52D3BF_E4E2_A024_41DD_B37B740DB1CC",
  "this.overlay_EA52C3BF_E4E2_A024_41EB_069712A705F2"
 ],
 "thumbnailUrl": "media/map_EA52A3BF_E4E2_A024_41DD_9E951667780A_t.jpg",
 "image": {
  "levels": [
   {
    "url": "media/map_EA52A3BF_E4E2_A024_41DD_9E951667780A.jpeg",
    "width": 1350,
    "class": "ImageResourceLevel",
    "height": 1800
   },
   {
    "url": "media/map_EA52A3BF_E4E2_A024_41DD_9E951667780A_lq.jpeg",
    "width": 221,
    "class": "ImageResourceLevel",
    "tags": "preload",
    "height": 295
   }
  ],
  "class": "ImageResource"
 },
 "fieldOfViewOverlayOutsideColor": "#000000",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "width": 1350,
 "class": "Map",
 "fieldOfViewOverlayRadiusScale": 0.3,
 "fieldOfViewOverlayOutsideOpacity": 0,
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "scaleMode": "fit_inside",
 "minimumZoomFactor": 0.5,
 "height": 1800
},
{
 "class": "PanoramaCamera",
 "id": "panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "label": "Scene 30",
 "id": "panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_C48F577E_CB3E_603F_41D2_41AC912F4EC7",
  "this.overlay_DB023DA8_CB3A_20C3_41D9_0394F98D7238"
 ],
 "class": "Panorama",
 "pitch": 0,
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_t.jpg",
 "partial": false,
 "hfovMax": 130,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "backwardYaw": 9.21,
   "class": "AdjacentPanorama",
   "yaw": -86.24,
   "distance": 1,
   "panorama": "this.panorama_D131A6F6_C107_9063_41B9_504D378B08B6"
  },
  {
   "backwardYaw": -34.21,
   "class": "AdjacentPanorama",
   "yaw": -150.32,
   "distance": 1,
   "panorama": "this.panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "camera_DA3FC4FB_E561_A02C_41DD_5D22C3BF565D",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 112,
  "yaw": -171.43,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "label": "2BR 11_Post",
 "id": "panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_F052B58D_E4E3_E0E4_41E6_7027C134E5A9",
  "this.overlay_F052958D_E4E3_E0E4_4186_FB8AAFDBAED6",
  "this.overlay_F052F58D_E4E3_E0E4_41D2_DFBB22D31E92",
  "this.overlay_F052C58D_E4E3_E0E4_41D4_1A85F94F9D80"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57",
   "x": 547.76,
   "class": "PanoramaMapLocation",
   "angle": 184.46,
   "y": 1321.77
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_t.jpg",
 "partial": false,
 "hfovMax": 130,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "backwardYaw": -2.36,
   "class": "AdjacentPanorama",
   "yaw": -98.05,
   "distance": 1,
   "panorama": "this.panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F"
  },
  {
   "backwardYaw": -37.96,
   "class": "AdjacentPanorama",
   "yaw": 100.79,
   "distance": 1,
   "panorama": "this.panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B"
  },
  {
   "backwardYaw": 102.26,
   "class": "AdjacentPanorama",
   "yaw": -85.99,
   "distance": 1,
   "panorama": "this.panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 112,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DF64B61F_E561_A3E4_41E8_2EB442E5518D",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 126,
  "yaw": -46.63,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "label": "Lobby",
 "id": "panorama_D107072D_C101_B1E1_41C3_F79721CA7165",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_D107272E_C101_B1E2_41BE_1E120D1B0641"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_EA52A3BF_E4E2_A024_41DD_9E951667780A",
   "x": 838.93,
   "class": "PanoramaMapLocation",
   "angle": 53.07,
   "y": 1147.34
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_t.jpg",
 "partial": false,
 "hfovMax": 124,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "backwardYaw": 162.79,
   "class": "AdjacentPanorama",
   "yaw": -47.05,
   "distance": 1,
   "panorama": "this.panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "camera_DBF064D7_E561_A063_41C4_7124F62B9308",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 125,
  "yaw": 99.36,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DF8F066D_E561_A024_41AA_0CD551668B18",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 112.92,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PlayList",
 "id": "playList_DB635491_E561_A0FC_41EC_164D71394721",
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57",
   "class": "MapPlayListItem",
   "player": "this.MapViewerMapPlayer"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "camera_DE6616D9_E561_A06C_41A8_522D80F45AB7",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": -77.74,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DF0465F2_E561_A03C_4184_21E55B1BB5F8",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 125,
  "yaw": 22.51,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DA9E354B_E561_A06C_41D9_70798B255402",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 125,
  "yaw": 112.15,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DBCD64F4_E561_A024_41E3_FAA89B037E8B",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": 15.8,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": 0.28,
  "pitch": -1.02
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DF519634_E561_A025_41E0_04DB1DBCFECF",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 125,
  "yaw": 168.51,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DAAFE543_E561_A063_41E2_95C57AA9DCA2",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 119,
  "yaw": 94.39,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DFB0664A_E561_A06C_41A9_41068E2801CA",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 112,
  "yaw": 71.56,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PlayList",
 "id": "ThumbnailList_9EF12029_8807_EDE3_41D2_02902F7923F7_playlist",
 "items": [
  {
   "media": "this.panorama_D107072D_C101_B1E1_41C3_F79721CA7165",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_9EF12029_8807_EDE3_41D2_02902F7923F7_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_D107072D_C101_B1E1_41C3_F79721CA7165_camera"
  },
  {
   "media": "this.panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_9EF12029_8807_EDE3_41D2_02902F7923F7_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_camera"
  },
  {
   "media": "this.panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_9EF12029_8807_EDE3_41D2_02902F7923F7_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_camera"
  },
  {
   "media": "this.panorama_F7E00372_E4EE_603D_41EA_A612E89349F8",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_9EF12029_8807_EDE3_41D2_02902F7923F7_playlist, 3, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_camera"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "camera_DE7136D2_E561_A07C_41C1_4D18EE680B7F",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 126,
  "yaw": 142.04,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PlayList",
 "id": "playList_DB604492_E561_A0FC_41DC_FD97EA8885C4",
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_EA52A3BF_E4E2_A024_41DD_9E951667780A",
   "class": "MapPlayListItem",
   "player": "this.MapViewerMapPlayer"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "camera_DE3F96A7_E561_A024_41D9_3B7EAF2DF353",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 111,
  "yaw": 132.95,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "Panorama",
 "partial": false,
 "label": "1B 05_Post",
 "id": "panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "pitch": 0,
 "hfovMax": 131,
 "thumbnailUrl": "media/panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E_t.jpg",
 "hfovMin": "250%"
},
{
 "class": "PanoramaCamera",
 "id": "panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DE6CD6E0_E561_A05D_41E7_F555D2E01C84",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 126,
  "yaw": -98.82,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DFFB967C_E561_A024_41C3_6A482FBBA398",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": 12.77,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DF47B63B_E561_A023_41E5_54B4824B4283",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 133,
  "yaw": -17.21,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 70,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "label": "1B 04_Post",
 "id": "panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_CE9CA1F2_C106_9063_41E7_41F73EE5A14D"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C",
   "x": 277.4,
   "class": "PanoramaMapLocation",
   "angle": 0,
   "y": 668.22
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_t.jpg",
 "partial": false,
 "hfovMax": 130,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "backwardYaw": -170.25,
   "class": "AdjacentPanorama",
   "yaw": 115.83,
   "distance": 1,
   "panorama": "this.panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0"
  }
 ]
},
{
 "label": "2BR 09_Post",
 "id": "panorama_F0FF423F_E4E6_6024_41CC_312C315119C2",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_F0FF323F_E4E6_6024_41E2_A06C3A9C838D",
  "this.overlay_FAD6E4B3_E523_A03C_41E1_8FE4594B6CBA"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57",
   "x": 679.94,
   "class": "PanoramaMapLocation",
   "angle": 85.39,
   "y": 634.74
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_t.jpg",
 "partial": false,
 "hfovMax": 130,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "backwardYaw": 174.84,
   "class": "AdjacentPanorama",
   "yaw": 5.81,
   "distance": 1,
   "panorama": "this.panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41"
  },
  {
   "backwardYaw": -108.44,
   "class": "AdjacentPanorama",
   "yaw": -174.7,
   "distance": 1,
   "panorama": "this.panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "camera_DBDA24ED_E561_A024_41D0_D6544BB9C9F1",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": -79.21,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DE0B76CB_E561_A06C_41D0_BEAD0CA474CA",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 125,
  "yaw": 177.64,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DFDD5691_E561_A0FC_41E3_6AC0D6BE8EB2",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": 145.79,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "label": "2BR 08_Post",
 "id": "panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_F779F99A_E4E2_A0EC_41E9_D6D171E25046"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57",
   "x": 329.14,
   "class": "PanoramaMapLocation",
   "angle": -49.16,
   "y": 795.54
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_t.jpg",
 "partial": false,
 "hfovMax": 130,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "backwardYaw": -85.61,
   "class": "AdjacentPanorama",
   "yaw": -167.23,
   "distance": 1,
   "panorama": "this.panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 122,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "label": "2BR 13_Post",
 "id": "panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_F189E784_E4E3_A0E4_41EB_D438FF93F235",
  "this.overlay_F1881784_E4E3_A0E4_41C5_9F8794074D2C",
  "this.overlay_F1883784_E4E3_A0E4_419A_02B55621D3FB",
  "this.overlay_C522C89E_E522_A0E5_41CF_CA67B42D477D"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57",
   "x": 918.13,
   "class": "PanoramaMapLocation",
   "angle": 28.77,
   "y": 699.45
  }
 ],
 "hfov": 360,
 "hfovMin": "120%",
 "thumbnailUrl": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_t.jpg",
 "partial": false,
 "hfovMax": 130,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "backwardYaw": 5.81,
   "class": "AdjacentPanorama",
   "yaw": 174.84,
   "distance": 1,
   "panorama": "this.panorama_F0FF423F_E4E6_6024_41CC_312C315119C2"
  },
  {
   "backwardYaw": -85.99,
   "class": "AdjacentPanorama",
   "yaw": 102.26,
   "distance": 1,
   "panorama": "this.panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88"
  },
  {
   "backwardYaw": -0.02,
   "class": "AdjacentPanorama",
   "yaw": -77.9,
   "distance": 1,
   "panorama": "this.panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193"
  }
 ]
},
{
 "label": "CO 01_Post",
 "id": "panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_6FBE7ED0_76E3_06B7_41D6_605F850C71A4"
 ],
 "class": "Panorama",
 "pitch": 0,
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_t.jpg",
 "partial": false,
 "hfovMax": 130,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CED91950_C103_71BF_41E5_9F31733A8E82"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "camera_DA59252E_E561_A024_41D6_F8F513A32DB1",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 126,
  "yaw": -174.19,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "label": "2BR 07_Post",
 "id": "panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_F0984921_E4E6_61DC_41E0_90DD17DFD596",
  "this.overlay_F0983921_E4E6_61DC_41D8_6100420DEF67",
  "this.overlay_F9ED71FF_E521_A023_41BA_44C2C228A0FF"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57",
   "x": 601.82,
   "class": "PanoramaMapLocation",
   "angle": 230.88,
   "y": 815.17
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_t.jpg",
 "partial": false,
 "hfovMax": 130,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "backwardYaw": -167.23,
   "class": "AdjacentPanorama",
   "yaw": -85.61,
   "distance": 1,
   "panorama": "this.panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788"
  },
  {
   "backwardYaw": 175.9,
   "class": "AdjacentPanorama",
   "yaw": -35.45,
   "distance": 1,
   "panorama": "this.panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DF1845E9_E561_A02C_41E6_E2C967631A7A",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 125,
  "yaw": 22.51,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "label": "2BR 10_Post",
 "id": "panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_F7F4646C_E4E1_A025_41D0_03E0B99A7ED1"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57",
   "x": 337.91,
   "class": "PanoramaMapLocation",
   "angle": 249.86,
   "y": 591.55
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_t.jpg",
 "partial": false,
 "hfovMax": 130,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "backwardYaw": 166.43,
   "class": "AdjacentPanorama",
   "yaw": -164.97,
   "distance": 1,
   "panorama": "this.panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD"
  }
 ]
},
{
 "class": "PlayList",
 "id": "playList_DB628491_E561_A0FC_41EC_1C8589B8ECE9",
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C",
   "class": "MapPlayListItem",
   "player": "this.MapViewerMapPlayer"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "panorama_B94337F4_B5D0_A0B3_41D9_5454B406F98B_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 119,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "label": "1B 08_Post",
 "id": "panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_AD570C78_BAB6_E042_41C7_E5302432791D"
 ],
 "class": "Panorama",
 "partial": false,
 "pitch": 0,
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_B89D0164_B5D0_A1D3_41E6_97B1000E5B9B_t.jpg",
 "hfovMax": 130,
 "vfov": 180
},
{
 "label": "2BR 02_Post",
 "id": "panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_F748692C_E4E3_A024_41EC_57DF353B7125",
  "this.overlay_F748A92C_E4E3_A024_41E0_45A5140C47B3",
  "this.overlay_F748F92C_E4E3_A024_41E5_7D449DBAD90F",
  "this.overlay_F74B092C_E4E3_A024_41AB_84F5CAE8CA8F"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57",
   "x": 370.3,
   "class": "PanoramaMapLocation",
   "angle": -14.8,
   "y": 299.45
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_t.jpg",
 "partial": false,
 "hfovMax": 130,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "backwardYaw": -43.51,
   "class": "AdjacentPanorama",
   "yaw": -87.32,
   "distance": 1,
   "panorama": "this.panorama_F7E00372_E4EE_603D_41EA_A612E89349F8"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD"
  },
  {
   "backwardYaw": -131.65,
   "class": "AdjacentPanorama",
   "yaw": 112.74,
   "distance": 1,
   "panorama": "this.panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41"
  }
 ]
},
{
 "label": "Scene 26_1",
 "id": "panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_E1C7F041_C102_8FA1_41BB_DD0F8AC19348",
  "this.overlay_E44FB814_C103_7FA7_41DE_D6E2BC6E0FE9",
  "this.overlay_E08254B0_C101_70FF_41E4_044B644C5989"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C",
   "x": 529.72,
   "class": "PanoramaMapLocation",
   "angle": 97.53,
   "y": 658.51
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_t.jpg",
 "partial": false,
 "hfovMax": 130,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "backwardYaw": -80.64,
   "class": "AdjacentPanorama",
   "yaw": 100.31,
   "distance": 1,
   "panorama": "this.panorama_D131A6F6_C107_9063_41B9_504D378B08B6"
  },
  {
   "backwardYaw": 115.83,
   "class": "AdjacentPanorama",
   "yaw": -170.25,
   "distance": 1,
   "panorama": "this.panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": 8.58,
  "pitch": -0.78
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DA030511_E561_A1FC_41E1_1F69B60D2905",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 119,
  "yaw": 77.86,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DF0155FA_E561_A02C_41BD_0D9CB7EF631B",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 133,
  "yaw": 175.94,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "gyroscopeVerticalDraggingEnabled": true,
 "class": "PanoramaPlayer",
 "buttonZoomIn": "this.IconButton_9D5C347E_B630_A7AF_41E2_6088D35D702D",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "buttonZoomOut": "this.IconButton_9A06AD7E_B630_A1AF_4194_A3A38EECE93C",
 "id": "MainViewerPanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "mouseControlMode": "drag_rotation"
},
{
 "class": "PlayList",
 "id": "playList_DB636491_E561_A0FC_41E6_A7DF71208C81",
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_EA313A8B_E4E2_60EC_41D7_1B2B5A51BF47",
   "class": "MapPlayListItem",
   "player": "this.MapViewerMapPlayer"
  }
 ]
},
{
 "maximumZoomFactor": 1.2,
 "label": "P-2BHK",
 "id": "map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57",
 "initialZoomFactor": 1,
 "overlays": [
  "this.overlay_C1F8D0E6_E562_6024_41EA_72A65B1EA231",
  "this.overlay_C1F8C0E6_E562_6024_41EA_4AEBA95EADFA",
  "this.overlay_C1F8B0E6_E562_6024_41E4_258F9E961D52",
  "this.overlay_C1F8A0E6_E562_6024_41D0_E0875DE22174",
  "this.overlay_C1F890E6_E562_6024_41EB_DA1874C06A28",
  "this.overlay_C1F880E6_E562_6024_41CF_4F9BC867EAD1",
  "this.overlay_C1F870E6_E562_6024_41E9_1E5AC3A7CEFF",
  "this.overlay_C1F860E6_E562_6024_41DB_54A59C9EE4DC",
  "this.overlay_C1F840E6_E562_6024_41D9_A5A93E0C82BF",
  "this.overlay_C1F830E6_E562_6024_41D8_43D1B03AAA26",
  "this.overlay_C1F820E6_E562_6024_41E6_19B5E9C8A6C7",
  "this.overlay_C1F810E6_E562_6024_41E5_7469C6009F0D",
  "this.overlay_C1F800E6_E562_6024_41D6_61020164B27F"
 ],
 "thumbnailUrl": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_t.jpg",
 "image": {
  "levels": [
   {
    "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57.jpeg",
    "width": 1350,
    "class": "ImageResourceLevel",
    "height": 1800
   },
   {
    "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_lq.jpeg",
    "width": 221,
    "class": "ImageResourceLevel",
    "tags": "preload",
    "height": 295
   }
  ],
  "class": "ImageResource"
 },
 "fieldOfViewOverlayOutsideColor": "#000000",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "width": 1350,
 "class": "Map",
 "fieldOfViewOverlayRadiusScale": 0.14,
 "fieldOfViewOverlayOutsideOpacity": 0,
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "scaleMode": "fit_inside",
 "minimumZoomFactor": 0.5,
 "height": 1800
},
{
 "class": "PanoramaCamera",
 "id": "panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 126,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DE2806B6_E561_A024_41D1_44F95F1EA9BA",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 119,
  "yaw": 144.55,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "panorama_D107072D_C101_B1E1_41C3_F79721CA7165_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 111,
  "yaw": -50.03,
  "pitch": 0.9
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DF6C7626_E561_A024_41DE_45AFEC46FBAC",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": 15.03,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DB9014C1_E561_A05F_41E0_26C2EC5EE50B",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 112,
  "yaw": -6.44,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "label": "1B 10_Post",
 "id": "panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_AD504EBD_BAB7_20C2_41D0_3B08C5F4468A"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C",
   "x": 1072.55,
   "class": "PanoramaMapLocation",
   "angle": 0,
   "y": 855.32
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD_t.jpg",
 "partial": false,
 "hfovMax": 130,
 "vfov": 180
},
{
 "maximumZoomFactor": 1.2,
 "label": "P-OR",
 "id": "map_EA313A8B_E4E2_60EC_41D7_1B2B5A51BF47",
 "initialZoomFactor": 1,
 "overlays": [
  "this.overlay_EA311A8B_E4E2_60EC_41E5_051D14B1E36B"
 ],
 "thumbnailUrl": "media/map_EA313A8B_E4E2_60EC_41D7_1B2B5A51BF47_t.jpg",
 "image": {
  "levels": [
   {
    "url": "media/map_EA313A8B_E4E2_60EC_41D7_1B2B5A51BF47.jpeg",
    "width": 1350,
    "class": "ImageResourceLevel",
    "height": 1800
   },
   {
    "url": "media/map_EA313A8B_E4E2_60EC_41D7_1B2B5A51BF47_lq.jpeg",
    "width": 221,
    "class": "ImageResourceLevel",
    "tags": "preload",
    "height": 295
   }
  ],
  "class": "ImageResource"
 },
 "fieldOfViewOverlayOutsideColor": "#000000",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "width": 1350,
 "class": "Map",
 "fieldOfViewOverlayRadiusScale": 0.14,
 "fieldOfViewOverlayOutsideOpacity": 0,
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "scaleMode": "fit_inside",
 "minimumZoomFactor": 0.5,
 "height": 1800
},
{
 "class": "PlayList",
 "id": "playList_DB63C492_E561_A0FC_41C7_A562898B597C",
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C",
   "class": "MapPlayListItem",
   "player": "this.MapViewerMapPlayer"
  }
 ]
},
{
 "label": "LO 02_Post",
 "id": "panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_CEE12826_C101_9FE3_41C2_1490CED1DAAC",
  "this.overlay_CEE13826_C101_9FE3_41D0_C985BFEBBAB3",
  "this.overlay_CEE0C826_C101_9FE3_41DC_2BBDA83A72A1"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_EA52A3BF_E4E2_A024_41DD_9E951667780A",
   "x": 793.24,
   "class": "PanoramaMapLocation",
   "angle": 14.31,
   "y": 737.18
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_t.jpg",
 "partial": false,
 "hfovMax": 137,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "backwardYaw": 124.7,
   "class": "AdjacentPanorama",
   "yaw": -4.06,
   "distance": 1,
   "panorama": "this.panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4"
  },
  {
   "backwardYaw": 124.7,
   "class": "AdjacentPanorama",
   "yaw": -1.57,
   "distance": 1,
   "panorama": "this.panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4"
  },
  {
   "backwardYaw": -47.05,
   "class": "AdjacentPanorama",
   "yaw": 162.79,
   "distance": 1,
   "panorama": "this.panorama_D107072D_C101_B1E1_41C3_F79721CA7165"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "panorama_62D80AF1_76A1_0E79_41B9_6129CEC4415E_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 128,
  "yaw": 4.03,
  "pitch": -6.69
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DFD6C68A_E561_A0EC_41A8_23DBCEC71EAE",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 125,
  "yaw": -170.79,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DA56F527_E561_A024_41B2_F460D03A2BE5",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 125,
  "yaw": 29.68,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "panorama_CED91950_C103_71BF_41E5_9F31733A8E82_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "label": "Corridor ",
 "id": "panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_D10B1750_C103_F1BF_41E2_5D717C4C761C",
  "this.overlay_D10B0750_C103_F1BF_41D4_9D1FA3938925",
  "this.overlay_D10B7750_C103_F1BF_41E4_0272AC77F3A0",
  "this.overlay_D10B6750_C103_F1BF_41DE_8476FAF284E6",
  "this.overlay_DA98E58F_CB39_E0DD_41E7_D734614B7C7C"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_EA313A8B_E4E2_60EC_41D7_1B2B5A51BF47",
   "x": 607.98,
   "class": "PanoramaMapLocation",
   "angle": -8.21,
   "y": 583.72
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_t.jpg",
 "partial": false,
 "hfovMax": 130,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "backwardYaw": -157.49,
   "class": "AdjacentPanorama",
   "yaw": 42.52,
   "distance": 1,
   "panorama": "this.panorama_F7E00372_E4EE_603D_41EA_A612E89349F8"
  },
  {
   "backwardYaw": -157.49,
   "class": "AdjacentPanorama",
   "yaw": 48.03,
   "distance": 1,
   "panorama": "this.panorama_F7E00372_E4EE_603D_41EA_A612E89349F8"
  },
  {
   "backwardYaw": -4.06,
   "class": "AdjacentPanorama",
   "yaw": 124.7,
   "distance": 1,
   "panorama": "this.panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB"
  },
  {
   "backwardYaw": -162.55,
   "class": "AdjacentPanorama",
   "yaw": -30.29,
   "distance": 1,
   "panorama": "this.panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7"
  },
  {
   "backwardYaw": -162.55,
   "class": "AdjacentPanorama",
   "yaw": -35.97,
   "distance": 1,
   "panorama": "this.panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7"
  }
 ]
},
{
 "label": "2 Bedroom",
 "id": "panorama_F7E00372_E4EE_603D_41EA_A612E89349F8",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_F7EFE372_E4EE_603D_41DB_F31DF0CF7CB2",
  "this.overlay_F7EFF373_E4EE_603C_4183_FD2DF7151F3C",
  "this.overlay_F7EFD373_E4EE_603C_41D8_F4EA0DCB6CC4",
  "this.overlay_F7EFB373_E4EE_603C_41E8_343581AACD0D",
  "this.overlay_F7EF9373_E4EE_603C_41E5_726C94E3F677"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57",
   "x": 217.62,
   "class": "PanoramaMapLocation",
   "angle": 60.12,
   "y": 457.78
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_t.jpg",
 "partial": false,
 "hfovMax": 130,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "backwardYaw": 42.52,
   "class": "AdjacentPanorama",
   "yaw": -157.49,
   "distance": 1,
   "panorama": "this.panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4"
  },
  {
   "backwardYaw": -87.32,
   "class": "AdjacentPanorama",
   "yaw": -43.51,
   "distance": 1,
   "panorama": "this.panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9"
  },
  {
   "backwardYaw": 169.75,
   "class": "AdjacentPanorama",
   "yaw": 26.83,
   "distance": 1,
   "panorama": "this.panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193"
  },
  {
   "backwardYaw": 173.56,
   "class": "AdjacentPanorama",
   "yaw": 43.32,
   "distance": 1,
   "panorama": "this.panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "camera_DA2E0502_E561_A1DD_41E7_1F3DCC220AA6",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": 149.71,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DB8D14D0_E561_A07C_41E7_7A0EB3E55537",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": -64.36,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DF0A1601_E561_A3DF_41DB_423A15B3D8BF",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 125,
  "yaw": 17.45,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "panorama_6E73DC57_769F_09BA_41D5_C5DA84082FB9_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "label": "1 Bedroom",
 "id": "panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_CE8F18BC_C106_F0E6_41E7_B826FC094B00",
  "this.overlay_CE8F48BC_C106_F0E6_4197_6ECCE672B4E4",
  "this.overlay_CE8FA8BC_C106_F0E7_41BE_432A79107D62",
  "this.overlay_CE8E78BC_C106_F0E7_41D5_A4D86D7D3340"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C",
   "x": 185.01,
   "class": "PanoramaMapLocation",
   "angle": 91.75,
   "y": 965.54
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_t.jpg",
 "partial": false,
 "hfovMax": 135,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "backwardYaw": -30.29,
   "class": "AdjacentPanorama",
   "yaw": -162.55,
   "distance": 1,
   "panorama": "this.panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4"
  },
  {
   "backwardYaw": -141.18,
   "class": "AdjacentPanorama",
   "yaw": -67.85,
   "distance": 1,
   "panorama": "this.panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A"
  },
  {
   "backwardYaw": -102.14,
   "class": "AdjacentPanorama",
   "yaw": 75.17,
   "distance": 1,
   "panorama": "this.panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE"
  },
  {
   "backwardYaw": 127.44,
   "class": "AdjacentPanorama",
   "yaw": -11.49,
   "distance": 1,
   "panorama": "this.panorama_DEC2337E_C11F_B062_41D0_887443DF32B4"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "camera_DABD153C_E561_A025_41E1_8F463FC947A9",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 124,
  "yaw": 179.98,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "label": "Scene 21",
 "id": "panorama_DEC2337E_C11F_B062_41D0_887443DF32B4",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_E3359815_C101_BFA1_4191_0A807803AF86",
  "this.overlay_DE228901_C101_91A1_41E2_F93DC7B552E1",
  "this.overlay_E0533E34_C106_B3E7_41E0_5417BC6587A4"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C",
   "x": 436.97,
   "class": "PanoramaMapLocation",
   "angle": 125.17,
   "y": 896.19
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_t.jpg",
 "partial": false,
 "hfovMax": 130,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "backwardYaw": -150.74,
   "class": "AdjacentPanorama",
   "yaw": -67.08,
   "distance": 1,
   "panorama": "this.panorama_D131A6F6_C107_9063_41B9_504D378B08B6"
  },
  {
   "backwardYaw": -11.49,
   "class": "AdjacentPanorama",
   "yaw": 127.44,
   "distance": 1,
   "panorama": "this.panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "panorama_45C96C3F_7761_09E9_41D5_F0245B35D131_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DF69E62D_E561_A027_41EC_0B0D801B2B45",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 125,
  "yaw": 29.26,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 125,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 124,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_camera",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 119,
  "yaw": 0,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DFA6F651_E561_A07C_41D0_474D9CFA798A",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 125,
  "yaw": -153.17,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "label": "Scene 44",
 "id": "panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "overlays": [
  "this.overlay_FEFEBD37_E522_6024_41DB_1E00820B34A9"
 ],
 "class": "Panorama",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57",
   "x": 760.37,
   "class": "PanoramaMapLocation",
   "angle": 69.81,
   "y": 811.48
  }
 ],
 "hfov": 360,
 "hfovMin": "250%",
 "thumbnailUrl": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_t.jpg",
 "partial": false,
 "hfovMax": 130,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "backwardYaw": 81.18,
   "class": "AdjacentPanorama",
   "yaw": -164.2,
   "distance": 1,
   "panorama": "this.panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "id": "camera_DE2276AE_E561_A025_41EC_8CD210F22253",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 130,
  "yaw": 81.95,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "class": "PanoramaCamera",
 "id": "camera_DBA414B3_E561_A03C_41D1_F625A81F17BE",
 "automaticZoomSpeed": 17,
 "manualRotationSpeed": 300,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "hfov": 124,
  "yaw": 92.68,
  "pitch": 0
 },
 "automaticRotationSpeed": 40
},
{
 "toolTipFontColor": "#606060",
 "progressBorderColor": "#AAAAAA",
 "playbackBarBottom": 10,
 "left": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "width": "100%",
 "toolTipTextShadowBlurRadius": 3,
 "id": "MainViewer",
 "playbackBarHeadOpacity": 1,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBackgroundColor": [
  "#EEEEEE",
  "#CCCCCC"
 ],
 "progressBarBackgroundColor": [
  "#222222",
  "#444444"
 ],
 "playbackBarBackgroundColor": [
  "#EEEEEE",
  "#CCCCCC"
 ],
 "playbackBarHeight": 20,
 "toolTipOpacity": 1,
 "toolTipFontSize": "12px",
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "minHeight": 50,
 "playbackBarProgressBorderSize": 0,
 "progressBarBorderRadius": 4,
 "playbackBarProgressBorderRadius": 0,
 "toolTipBackgroundColor": "#333333",
 "progressBarBorderSize": 0,
 "class": "ViewerArea",
 "toolTipShadowSpread": 0,
 "height": "100%",
 "playbackBarProgressBorderColor": "#000000",
 "minWidth": 100,
 "playbackBarHeadBorderRadius": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarBorderRadius": 4,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 0.61,
 "toolTipPaddingLeft": 6,
 "transitionMode": "blending",
 "playbackBarHeadBorderSize": 0,
 "toolTipDisplayTime": 600,
 "progressLeft": 10,
 "playbackBarProgressOpacity": 1,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarBorderSize": 2,
 "toolTipFontWeight": "bold",
 "toolTipBorderRadius": 4,
 "shadow": false,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipTextShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 10,
 "toolTipShadowHorizontalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowVerticalLength": 0,
 "toolTipFontStyle": "normal",
 "toolTipTextShadowOpacity": 1,
 "borderSize": 0,
 "toolTipBorderColor": "#666666",
 "progressHeight": 20,
 "toolTipShadowBlurRadius": 3,
 "propagateClick": false,
 "progressBackgroundOpacity": 1,
 "progressBottom": 1,
 "toolTipTextShadowColor": "#000000",
 "playbackBarProgressBackgroundColor": [
  "#222222",
  "#444444"
 ],
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "top": 0,
 "toolTipShadowColor": "#333333",
 "paddingRight": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "playbackBarHeadShadow": true,
 "progressBarOpacity": 1,
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "toolTipFontFamily": "Arial",
 "playbackBarBorderColor": "#AAAAAA",
 "progressBorderSize": 2,
 "toolTipBorderSize": 1,
 "progressBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipPaddingTop": 4,
 "progressBorderRadius": 4,
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipShadowVerticalLength": 0,
 "toolTipPaddingRight": 6,
 "playbackBarHeadHeight": 30,
 "paddingTop": 0,
 "data": {
  "name": "Main Viewer"
 },
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "borderRadius": 0,
 "progressBarBackgroundColorRatios": [
  0,
  1
 ],
 "progressBackgroundColorDirection": "vertical",
 "transitionDuration": 500
},
{
 "toolTipFontColor": "#606060",
 "progressBorderColor": "#AAAAAA",
 "playbackBarBottom": 0,
 "left": "87.54%",
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipTextShadowBlurRadius": 3,
 "id": "MapViewer",
 "playbackBarHeadOpacity": 1,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "right": "0%",
 "progressBackgroundColor": [
  "#EEEEEE",
  "#CCCCCC"
 ],
 "playbackBarBackgroundColor": [
  "#EEEEEE",
  "#CCCCCC"
 ],
 "playbackBarHeight": 20,
 "progressBarBackgroundColor": [
  "#222222",
  "#444444"
 ],
 "toolTipOpacity": 1,
 "toolTipFontSize": "12px",
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "minHeight": 1,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 4,
 "toolTipBackgroundColor": "#333333",
 "progressBarBorderSize": 0,
 "class": "ViewerArea",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBorderColor": "#000000",
 "minWidth": 1,
 "playbackBarHeadBorderRadius": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarBorderRadius": 4,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 0.61,
 "toolTipPaddingLeft": 6,
 "transitionMode": "blending",
 "playbackBarHeadBorderSize": 0,
 "toolTipDisplayTime": 600,
 "progressLeft": 10,
 "playbackBarProgressOpacity": 1,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarBorderSize": 2,
 "toolTipFontWeight": "bold",
 "toolTipBorderRadius": 4,
 "shadow": false,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipTextShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 10,
 "toolTipShadowHorizontalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowVerticalLength": 0,
 "toolTipFontStyle": "normal",
 "toolTipTextShadowOpacity": 1,
 "borderSize": 0,
 "toolTipBorderColor": "#666666",
 "toolTipShadowBlurRadius": 3,
 "propagateClick": false,
 "progressBackgroundOpacity": 1,
 "progressBottom": 2,
 "toolTipTextShadowColor": "#000000",
 "playbackBarProgressBackgroundColor": [
  "#222222",
  "#444444"
 ],
 "paddingRight": 0,
 "progressHeight": 20,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "top": "0%",
 "toolTipShadowColor": "#333333",
 "bottom": "66.19%",
 "vrPointerColor": "#FFFFFF",
 "playbackBarHeadShadow": true,
 "progressBarOpacity": 1,
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "toolTipFontFamily": "Arial",
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#AAAAAA",
 "progressBorderSize": 2,
 "toolTipBorderSize": 1,
 "progressBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipPaddingRight": 6,
 "progressBorderRadius": 4,
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipShadowVerticalLength": 0,
 "toolTipPaddingTop": 4,
 "playbackBarHeadHeight": 30,
 "paddingTop": 0,
 "data": {
  "name": "Floor Plan"
 },
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "borderRadius": 0,
 "progressBarBackgroundColorRatios": [
  0,
  1
 ],
 "progressBackgroundColorDirection": "vertical",
 "transitionDuration": 500
},
{
 "layout": "horizontal",
 "itemThumbnailShadowColor": "#000000",
 "horizontalAlign": "center",
 "itemThumbnailShadow": true,
 "backgroundColorRatios": [
  0
 ],
 "itemThumbnailWidth": 100,
 "itemMode": "normal",
 "id": "ThumbnailList_9EF12029_8807_EDE3_41D2_02902F7923F7",
 "right": 812.5,
 "width": "29.112%",
 "itemLabelFontStyle": "normal",
 "itemThumbnailShadowOpacity": 0.27,
 "itemLabelHorizontalAlign": "center",
 "itemLabelFontFamily": "Arial",
 "itemThumbnailOpacity": 1,
 "verticalAlign": "top",
 "itemBorderRadius": 0,
 "backgroundColor": [
  "#000000"
 ],
 "paddingLeft": 20,
 "minHeight": 100,
 "itemThumbnailShadowVerticalLength": 3,
 "itemLabelPosition": "bottom",
 "itemHorizontalAlign": "center",
 "itemPaddingLeft": 3,
 "height": 114.05,
 "itemPaddingRight": 3,
 "class": "ThumbnailList",
 "itemThumbnailShadowSpread": 1,
 "minWidth": 200,
 "selectedItemBackgroundOpacity": 0,
 "itemThumbnailBorderRadius": 5,
 "itemPaddingTop": 3,
 "itemBackgroundColor": [],
 "selectedItemLabelFontWeight": "bold",
 "selectedItemLabelFontColor": "#999999",
 "itemBackgroundColorRatios": [],
 "shadow": false,
 "itemOpacity": 1,
 "itemVerticalAlign": "middle",
 "itemBackgroundOpacity": 0,
 "rollOverItemBackgroundOpacity": 0,
 "scrollBarMargin": 2,
 "rollOverItemLabelFontWeight": "bold",
 "backgroundColorDirection": "vertical",
 "borderSize": 0,
 "propagateClick": false,
 "itemLabelFontWeight": "bold",
 "itemLabelTextDecoration": "none",
 "paddingRight": 20,
 "bottom": "1.61%",
 "playList": "this.ThumbnailList_9EF12029_8807_EDE3_41D2_02902F7923F7_playlist",
 "itemThumbnailShadowBlurRadius": 8,
 "itemThumbnailScaleMode": "fit_outside",
 "itemLabelFontSize": "13px",
 "scrollBarWidth": 10,
 "selectedItemThumbnailShadow": true,
 "backgroundOpacity": 0.12,
 "itemLabelFontColor": "#FFFFFF",
 "itemBackgroundColorDirection": "vertical",
 "gap": 13,
 "paddingBottom": 10,
 "scrollBarColor": "#FFFFFF",
 "paddingTop": 10,
 "data": {
  "name": "ThumbnailList35762"
 },
 "itemLabelGap": 8,
 "itemThumbnailShadowHorizontalLength": 3,
 "borderRadius": 5,
 "itemPaddingBottom": 3,
 "scrollBarOpacity": 0.5,
 "itemThumbnailHeight": 63,
 "scrollBarVisible": "rollOver"
},
{
 "shadow": false,
 "horizontalAlign": "center",
 "id": "IconButton_9D5C347E_B630_A7AF_41E2_6088D35D702D",
 "width": 32,
 "right": "1.87%",
 "iconURL": "skin/IconButton_9D5C347E_B630_A7AF_41E2_6088D35D702D.png",
 "borderSize": 0,
 "propagateClick": false,
 "paddingRight": 0,
 "bottom": "46.98%",
 "pressedIconURL": "skin/IconButton_9D5C347E_B630_A7AF_41E2_6088D35D702D_pressed.png",
 "minHeight": 0,
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "mode": "push",
 "height": 32,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "minWidth": 0,
 "paddingTop": 0,
 "rollOverIconURL": "skin/IconButton_9D5C347E_B630_A7AF_41E2_6088D35D702D_rollover.png",
 "borderRadius": 0,
 "data": {
  "name": "Button37510"
 },
 "transparencyActive": true,
 "cursor": "hand"
},
{
 "shadow": false,
 "horizontalAlign": "center",
 "id": "IconButton_9A06AD7E_B630_A1AF_4194_A3A38EECE93C",
 "width": 32,
 "right": "1.87%",
 "iconURL": "skin/IconButton_9A06AD7E_B630_A1AF_4194_A3A38EECE93C.png",
 "borderSize": 0,
 "propagateClick": false,
 "paddingRight": 0,
 "bottom": "42.67%",
 "pressedIconURL": "skin/IconButton_9A06AD7E_B630_A1AF_4194_A3A38EECE93C_pressed.png",
 "minHeight": 0,
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "mode": "push",
 "height": 32,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "minWidth": 0,
 "paddingTop": 0,
 "rollOverIconURL": "skin/IconButton_9A06AD7E_B630_A1AF_4194_A3A38EECE93C_rollover.png",
 "borderRadius": 0,
 "data": {
  "name": "Button37499"
 },
 "transparencyActive": true,
 "cursor": "hand"
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FCD0BD_E57F_A027_41E0_6057C945EA23",
   "yaw": -2.36,
   "pitch": -1.64,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.4,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88, this.camera_DE2276AE_E561_A025_41EC_8CD210F22253); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.36,
   "hfov": 5.4,
   "pitch": -1.64
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F7A1B3EC_E4E6_E024_41D7_507820483E95",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FCE0BD_E57F_A027_41E0_FE9F73BD8FAA",
   "yaw": 175.9,
   "pitch": -24.94,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.25,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80, this.camera_DE2806B6_E561_A024_41D1_44F95F1EA9BA); this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_1_HS_5_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 175.9,
   "hfov": 9.25,
   "pitch": -24.94
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F7A193EC_E4E6_E024_41E2_6E64E2273FD4",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FC90BB_E57F_A02C_417D_8AA196117AF7",
   "yaw": 133.79,
   "pitch": -26.32,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.14,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_1_HS_4_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 133.79,
   "hfov": 9.14,
   "pitch": -26.32
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F71D04F9_E4E3_A02C_41DF_7336BBC977EE",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FCB0BB_E57F_A023_41DC_CA946ED67DF5",
   "yaw": -131.65,
   "pitch": -33.97,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.45,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE, this.camera_DFACE658_E561_A06C_41D4_4F2DF91DCE62); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_1_HS_5_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -131.65,
   "hfov": 9.45,
   "pitch": -33.97
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F71D24F9_E4E3_A02C_41DE_BEF5C2A3BCBD",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FCD0BB_E57F_A023_417F_45E59513C070",
   "yaw": 169.75,
   "pitch": -14.34,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.88,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F7E00372_E4EE_603D_41EA_A612E89349F8, this.camera_DFA6F651_E561_A07C_41D0_474D9CFA798A); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_1_HS_6_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 169.75,
   "hfov": 9.88,
   "pitch": -14.34
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F71DC4F9_E4E3_A02C_41D8_B2BE33695032",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FCE0BB_E57F_A023_41D8_9C0FA59CA95F",
   "yaw": -0.02,
   "pitch": -4.48,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.19,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41, this.camera_DF92865F_E561_A064_41D0_D54CA02B2484); this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_1_HS_8_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.02,
   "hfov": 4.19,
   "pitch": -4.48
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F71D84F9_E4E3_A02F_41C6_E2B45A402000",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "LensFlarePanoramaOverlay",
 "yaw": -113.33,
 "pitch": 25.07,
 "bleachingDistance": 0.4,
 "id": "overlay_094FAD41_7961_017A_41A5_5EC6BB97C4CD",
 "bleaching": 0.7
},
{
 "class": "LensFlarePanoramaOverlay",
 "yaw": -88.31,
 "pitch": 15.33,
 "bleachingDistance": 0.4,
 "id": "overlay_05AE418B_7AA7_010D_4177_28091F2F0994",
 "bleaching": 0.7
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD34B7F_C10E_F061_41C4_7675212F2CAB",
   "yaw": 174.85,
   "pitch": -32.29,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.62,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_1_HS_3_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 174.85,
   "hfov": 8.62,
   "pitch": -32.29
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_CE06460A_C107_93A3_41CA_22EE09173271",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD39B7F_C10E_F061_41E5_E3330FCD745B",
   "yaw": 115.64,
   "pitch": -10.75,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.02,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE, this.camera_DA646520_E561_A1DC_41DE_C463EC526FC7); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_1_HS_4_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 115.64,
   "hfov": 10.02,
   "pitch": -10.75
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_CE06660A_C107_93A3_41E1_BF3D03C89ECF",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD3EB80_C10E_F09F_41E7_7903F6B37C42",
   "yaw": -34.21,
   "pitch": -2.05,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.4,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A, this.camera_DA56F527_E561_A024_41B2_F460D03A2BE5); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_1_HS_8_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -34.21,
   "hfov": 5.4,
   "pitch": -2.05
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_CE06260A_C107_93A3_41D3_26C2397488F3",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "media": "this.panorama_D107072D_C101_B1E1_41C3_F79721CA7165",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB60A492_E561_A0FC_41E4_590F03BDC67C, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_D107072D_C101_B1E1_41C3_F79721CA7165_camera",
 "id": "PanoramaPlayListItem_DB60A492_E561_A0FC_41E4_590F03BDC67C"
},
{
 "media": "this.panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB612492_E561_A0FC_41C0_3EAADAED92A5, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_camera",
 "id": "PanoramaPlayListItem_DB612492_E561_A0FC_41C0_3EAADAED92A5"
},
{
 "media": "this.panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB61A493_E561_A0FC_41E5_619103A433D9, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_camera",
 "id": "PanoramaPlayListItem_DB61A493_E561_A0FC_41E5_619103A433D9"
},
{
 "media": "this.panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB6C4493_E561_A0FC_41CA_D60DE1546A75, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 4, 5)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_camera",
 "id": "PanoramaPlayListItem_DB6C4493_E561_A0FC_41CA_D60DE1546A75"
},
{
 "media": "this.panorama_DEC2337E_C11F_B062_41D0_887443DF32B4",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB6C2493_E561_A0FC_41E9_7C6B0F09BD0E, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 5, 6)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_camera",
 "id": "PanoramaPlayListItem_DB6C2493_E561_A0FC_41E9_7C6B0F09BD0E"
},
{
 "media": "this.panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB6D5493_E561_A0FC_41E0_55CB4490B97C, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 6, 7)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_camera",
 "id": "PanoramaPlayListItem_DB6D5493_E561_A0FC_41E0_55CB4490B97C"
},
{
 "media": "this.panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB6D2493_E561_A0FC_41D9_208782DC8FFA, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 7, 8)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_camera",
 "id": "PanoramaPlayListItem_DB6D2493_E561_A0FC_41D9_208782DC8FFA"
},
{
 "media": "this.panorama_D131A6F6_C107_9063_41B9_504D378B08B6",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB6DA494_E561_A0E4_4191_C1271C29E903, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 8, 9)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_D131A6F6_C107_9063_41B9_504D378B08B6_camera",
 "id": "PanoramaPlayListItem_DB6DA494_E561_A0E4_4191_C1271C29E903"
},
{
 "media": "this.panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB6A3494_E561_A0E4_41D0_07D6C8C4C22B, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 9, 10)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_camera",
 "id": "PanoramaPlayListItem_DB6A3494_E561_A0E4_41D0_07D6C8C4C22B"
},
{
 "media": "this.panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB6B3494_E561_A0E4_41D2_B6C43E2BE11E, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 11, 12)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_camera",
 "id": "PanoramaPlayListItem_DB6B3494_E561_A0E4_41D2_B6C43E2BE11E"
},
{
 "media": "this.panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB6B8494_E561_A0E4_41E8_2FC6330DD649, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 12, 13)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_camera",
 "id": "PanoramaPlayListItem_DB6B8494_E561_A0E4_41E8_2FC6330DD649"
},
{
 "media": "this.panorama_F7E00372_E4EE_603D_41EA_A612E89349F8",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB68F494_E561_A0E4_41DF_4AFE6B4AA31F, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 14, 15)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_camera",
 "id": "PanoramaPlayListItem_DB68F494_E561_A0E4_41DF_4AFE6B4AA31F"
},
{
 "media": "this.panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB697495_E561_A0E4_41EC_20B7533EBA82, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 15, 16)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_camera",
 "id": "PanoramaPlayListItem_DB697495_E561_A0E4_41EC_20B7533EBA82"
},
{
 "media": "this.panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB69F495_E561_A0E4_41E5_9AF45D78D12D, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 16, 17)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_camera",
 "id": "PanoramaPlayListItem_DB69F495_E561_A0E4_41E5_9AF45D78D12D"
},
{
 "media": "this.panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB561495_E561_A0E4_41CB_2C05F74268E8, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 17, 18)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_camera",
 "id": "PanoramaPlayListItem_DB561495_E561_A0E4_41CB_2C05F74268E8"
},
{
 "media": "this.panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB568495_E561_A0E4_41D3_2CC263D1A8F4, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 18, 19)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_camera",
 "id": "PanoramaPlayListItem_DB568495_E561_A0E4_41D3_2CC263D1A8F4"
},
{
 "media": "this.panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB570495_E561_A0E4_41A3_EA030ED2750F, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 19, 20)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_camera",
 "id": "PanoramaPlayListItem_DB570495_E561_A0E4_41A3_EA030ED2750F"
},
{
 "media": "this.panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB578495_E561_A0E4_41E4_0A5BC5660E7F, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 20, 21)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_camera",
 "id": "PanoramaPlayListItem_DB578495_E561_A0E4_41E4_0A5BC5660E7F"
},
{
 "media": "this.panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB541496_E561_A0E4_41EB_2005B78111AA, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 21, 22)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_camera",
 "id": "PanoramaPlayListItem_DB541496_E561_A0E4_41EB_2005B78111AA"
},
{
 "media": "this.panorama_F0FF423F_E4E6_6024_41CC_312C315119C2",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB571496_E561_A0E4_41D2_51CE0DB63CB3, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 22, 23)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_camera",
 "id": "PanoramaPlayListItem_DB571496_E561_A0E4_41D2_51CE0DB63CB3"
},
{
 "media": "this.panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB57E496_E561_A0E4_41D1_23E8FEB07209, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 23, 24)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_camera",
 "id": "PanoramaPlayListItem_DB57E496_E561_A0E4_41D1_23E8FEB07209"
},
{
 "media": "this.panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB541496_E561_A0E4_41DB_5A8D0DDA7002, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 24, 25)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_camera",
 "id": "PanoramaPlayListItem_DB541496_E561_A0E4_41DB_5A8D0DDA7002"
},
{
 "media": "this.panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB554496_E561_A0E4_4197_6AE12177A61F, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 26, 27)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_camera",
 "id": "PanoramaPlayListItem_DB554496_E561_A0E4_4197_6AE12177A61F"
},
{
 "media": "this.panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB537497_E561_A0E4_41E1_245984BE007C, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 31, 32)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_B9723ECA_B5D0_A0D7_41D0_835E8CC585CD_camera",
 "id": "PanoramaPlayListItem_DB537497_E561_A0E4_41E1_245984BE007C"
},
{
 "media": "this.panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8",
 "class": "PanoramaPlayListItem",
 "end": "this.trigger('tourEnded')",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB53F497_E561_A0E4_41C6_1139AB55C533, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 32, 0)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_camera",
 "id": "PanoramaPlayListItem_DB53F497_E561_A0E4_41C6_1139AB55C533"
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD50B84_C10E_F0A6_41BF_D28C2403EE02",
   "yaw": -97.59,
   "pitch": -1.95,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.4,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_1_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -97.59,
   "hfov": 5.4,
   "pitch": -1.95
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_CE1BCC90_C107_70BF_41D1_B1506214D710",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD5BB84_C10E_F0A7_41C2_C7C4DC3478D8",
   "yaw": -102.14,
   "pitch": -32.82,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.57,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7, this.camera_DB8694C9_E561_A06C_41DB_EF8E9914C98B); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_1_HS_10_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -102.14,
   "hfov": 8.57,
   "pitch": -32.82
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_CE1B8C91_C107_70A1_41E0_DCD0BB6FD940",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD59B85_C10E_F0A6_41DE_ED80ECC8D4F5",
   "yaw": 4.03,
   "pitch": -17.06,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.86,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC, this.camera_DB8D14D0_E561_A07C_41E7_7A0EB3E55537); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_1_HS_11_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.03,
   "hfov": 8.86,
   "pitch": -17.06
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_CE147C91_C107_70A1_41D0_AD1B438E3C65",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD53B83_C10E_F0A1_41E0_CB7AC761EEEF",
   "yaw": -141.18,
   "pitch": -0.49,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.4,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7, this.camera_DA9E354B_E561_A06C_41D9_70798B255402); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -141.18,
   "hfov": 5.4,
   "pitch": -0.49
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_CEB39EF7_C106_F062_41D2_51BD9485AABD",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "map": {
  "width": 152.05,
  "x": 108.99,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C_HS_0_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 892.39,
  "offsetY": 0,
  "height": 146.29,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 108.99,
  "height": 146.29,
  "y": 892.39,
  "width": 152.05,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C_HS_0.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_E5BCFE44_C102_B3A7_41D1_EDF1930D9049"
},
{
 "map": {
  "width": 152.05,
  "x": 140.36,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C_HS_1_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 1032.25,
  "offsetY": 0,
  "height": 146.29,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 140.36,
  "height": 146.29,
  "y": 1032.25,
  "width": 152.05,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C_HS_1.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_E5BB0E44_C102_B3A7_41E7_F0C8FCF49F28"
},
{
 "map": {
  "width": 152.05,
  "x": 519.57,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C_HS_2_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 947.97,
  "offsetY": 0,
  "height": 146.29,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 519.57,
  "height": 146.29,
  "y": 947.97,
  "width": 152.05,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C_HS_2.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_E5BB3E44_C102_B3A7_41CF_5364FC4FF30F"
},
{
 "map": {
  "width": 152.05,
  "x": 489.28,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C_HS_3_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 753.99,
  "offsetY": 0,
  "height": 146.29,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 489.28,
  "height": 146.29,
  "y": 753.99,
  "width": 152.05,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C_HS_3.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_E5BB5E44_C102_B3A7_41D8_393F8D3AA9D3"
},
{
 "map": {
  "width": 152.05,
  "x": 101.16,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C_HS_4_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 764.42,
  "offsetY": 0,
  "height": 146.29,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 101.16,
  "height": 146.29,
  "y": 764.42,
  "width": 152.05,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C_HS_4.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_E5BB4E44_C102_B3A7_41B1_B3B8362AA147"
},
{
 "map": {
  "width": 152.05,
  "x": 201.38,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C_HS_6_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 595.07,
  "offsetY": 0,
  "height": 146.29,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 201.38,
  "height": 146.29,
  "y": 595.07,
  "width": 152.05,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C_HS_6.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_E5BB6E44_C102_B3A7_41CA_3342DDD43ABF"
},
{
 "map": {
  "width": 152.05,
  "x": 996.52,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C_HS_7_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 782.17,
  "offsetY": 0,
  "height": 146.29,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 996.52,
  "height": 146.29,
  "y": 782.17,
  "width": 152.05,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C_HS_7.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_E5BB8E44_C102_B3A7_41DD_242E478B2931"
},
{
 "map": {
  "width": 152.05,
  "x": 360.94,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C_HS_8_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 823.04,
  "offsetY": 0,
  "height": 146.29,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 360.94,
  "height": 146.29,
  "y": 823.04,
  "width": 152.05,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C_HS_8.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_E5BBBE44_C102_B3A7_41C6_B812A1392411"
},
{
 "map": {
  "width": 152.05,
  "x": 453.7,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C_HS_10_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 585.36,
  "offsetY": 0,
  "height": 146.29,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 453.7,
  "height": 146.29,
  "y": 585.36,
  "width": 152.05,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_E5BCDE44_C102_B3A7_41E1_BF1AE241847C_HS_10.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_E9BF7B10_C106_91BE_41DC_3A8A2997C0B0"
},
{
 "class": "LensFlarePanoramaOverlay",
 "yaw": 133.62,
 "pitch": 48.97,
 "bleachingDistance": 0.4,
 "id": "overlay_AD498ACA_BAB7_2046_41E4_384B67950040",
 "bleaching": 0.7
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FC40BD_E57F_A024_41CD_33C995F87527",
   "yaw": 133.37,
   "pitch": -4.14,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.39,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD, this.camera_DA3FC4FB_E561_A02C_41DD_5D22C3BF565D); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 133.37,
   "hfov": 5.39,
   "pitch": -4.14
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F0B1DAC4_E4E1_A065_41B1_D156AABCB506",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FC90BD_E57F_A024_41D0_6F9DB67C86AD",
   "yaw": -37.96,
   "pitch": -4.53,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.38,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88, this.camera_DBDA24ED_E561_A024_41D0_D6544BB9C9F1); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -37.96,
   "hfov": 5.38,
   "pitch": -4.53
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F0B1CAC4_E4E1_A065_41AB_D3D020030D89",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FCB0BD_E57F_A024_41D9_9F0EBCB2BB92",
   "yaw": 81.18,
   "pitch": -6.14,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.2,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8, this.camera_DBCD64F4_E561_A024_41E3_FAA89B037E8B); this.mainPlayList.set('selectedIndex', 32)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_1_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 81.18,
   "hfov": 6.2,
   "pitch": -6.14
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F928E64A_E522_E06C_41EC_65DFEAC0F19F",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD24B81_C10E_F0A1_41D9_F23A991FBFE0",
   "yaw": -150.74,
   "pitch": -1.88,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.4,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_DEC2337E_C11F_B062_41D0_887443DF32B4, this.camera_DF8F066D_E561_A024_41AA_0CD551668B18); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -150.74,
   "hfov": 5.4,
   "pitch": -1.88
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_D13196F6_C107_9063_41B1_2EC552194353",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD2AB82_C10E_F0A3_41DA_CBBFB0F13A15",
   "yaw": 9.21,
   "pitch": 0.2,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.4,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A, this.camera_DFF5C675_E561_A024_4184_E3AF3FB4D7A9); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 9.21,
   "hfov": 5.4,
   "pitch": 0.2
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_D13176F6_C107_9063_41E0_DD4095379778",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD2FB82_C10E_F0A3_41DD_E5AE39BDB7B8",
   "yaw": -80.64,
   "pitch": -31.85,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.9,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0, this.camera_DF98A666_E561_A024_41D8_CCA8ED6AA1A1); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_1_HS_5_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -80.64,
   "hfov": 8.9,
   "pitch": -31.85
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_E2AAE677_C10E_F061_41A6_755D2FAFCA63",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FB00BB_E57F_A023_41EA_D78BD5C4E797",
   "yaw": 173.56,
   "pitch": -25.28,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.22,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F7E00372_E4EE_603D_41EA_A612E89349F8, this.camera_DF714610_E561_A3FD_41DF_AD04AA10DDB0); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_1_HS_3_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 173.56,
   "hfov": 9.22,
   "pitch": -25.28
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F73B5E31_E4E3_A03C_4170_7E0D35969260",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FDA0BC_E57F_A024_41E3_83C61A57D90F",
   "yaw": 8.57,
   "pitch": -5.35,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.11,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B, this.camera_DF64B61F_E561_A3E4_41E8_2EB442E5518D); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 8.57,
   "hfov": 4.11,
   "pitch": -5.35
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F73B7E31_E4E3_A03C_41EA_CD6FB084B8FC",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FDF0BC_E57F_A024_41B5_D3BEF60ABBB1",
   "yaw": 166.43,
   "pitch": -2.46,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.81,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10, this.camera_DF6C7626_E561_A024_41DE_45AFEC46FBAC); this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_1_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 166.43,
   "hfov": 4.81,
   "pitch": -2.46
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F73B1E31_E4E3_A03C_41E1_768103C826AF",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FC10BC_E57F_A024_41D6_69FEE7142C37",
   "yaw": -108.44,
   "pitch": -7.21,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.15,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F0FF423F_E4E6_6024_41CC_312C315119C2, this.camera_DF7AB618_E561_A3EC_41DC_3E124F0249F7); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_1_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -108.44,
   "hfov": 4.15,
   "pitch": -7.21
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F73B0E31_E4E3_A03C_41D2_7C66F0A2D5A8",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FC30BC_E57F_A024_41E7_A3588339BC34",
   "yaw": -30.24,
   "pitch": -7.84,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.61,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_1_HS_7_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -30.24,
   "hfov": 4.61,
   "pitch": -7.84
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F73B3E36_E4E3_A024_4197_80704C598DBD",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_F133F417_C103_97A1_41D3_E00D726D5799",
   "yaw": -170.56,
   "pitch": -19.13,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.64,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0_HS_2_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -170.56,
   "hfov": 9.64,
   "pitch": -19.13
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_CED9F950_C103_71BF_41D2_90BF3AB8531E",
 "data": {
  "label": "Image"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0_HS_8_0.png",
      "width": 178,
      "class": "ImageResourceLevel",
      "height": 180
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.88,
   "hfov": 7.6,
   "yaw": -74.67
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0_HS_8_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -74.67,
   "hfov": 7.6,
   "pitch": -13.88
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_CED99950_C103_71BF_41E7_612C363AA03C",
 "data": {
  "label": "Circle Arrow 01"
 }
},
{
 "map": {
  "width": 161.62,
  "x": 758.12,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_EA52A3BF_E4E2_A024_41DD_9E951667780A_HS_0_map.gif",
     "width": 15,
     "class": "ImageResourceLevel",
     "height": 17
    }
   ],
   "class": "ImageResource"
  },
  "y": 1056.96,
  "offsetY": 0,
  "height": 180.78,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 758.12,
  "height": 180.78,
  "y": 1056.96,
  "width": 161.62,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_EA52A3BF_E4E2_A024_41DD_9E951667780A_HS_0.png",
     "width": 161,
     "class": "ImageResourceLevel",
     "height": 180
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_EA52D3BF_E4E2_A024_41DD_B37B740DB1CC"
},
{
 "map": {
  "width": 150.1,
  "x": 718.19,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_EA52A3BF_E4E2_A024_41DD_9E951667780A_HS_1_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 17
    }
   ],
   "class": "ImageResource"
  },
  "y": 655.43,
  "offsetY": 0,
  "height": 163.5,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 718.19,
  "height": 163.5,
  "y": 655.43,
  "width": 150.1,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_EA52A3BF_E4E2_A024_41DD_9E951667780A_HS_1.png",
     "width": 150,
     "class": "ImageResourceLevel",
     "height": 163
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_EA52C3BF_E4E2_A024_41EB_069712A705F2"
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D1235B13_CB59_E1C5_41D4_6591EC6FA95A",
   "yaw": -150.32,
   "pitch": -5.63,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.37,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC, this.camera_DFDD5691_E561_A0FC_41E3_6AC0D6BE8EB2); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -150.32,
   "hfov": 5.37,
   "pitch": -5.63
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_C48F577E_CB3E_603F_41D2_41AC912F4EC7",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D1232B13_CB59_E1C5_41DB_3708942434AB",
   "yaw": -86.24,
   "pitch": -4.42,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.38,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D131A6F6_C107_9063_41B9_504D378B08B6, this.camera_DFD6C68A_E561_A0EC_41A8_23DBCEC71EAE); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -86.24,
   "hfov": 5.38,
   "pitch": -4.42
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_DB023DA8_CB3A_20C3_41D9_0394F98D7238",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FA30BF_E57F_A024_41E3_27C37F54EF28",
   "yaw": -98.05,
   "pitch": 0.1,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.4,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F, this.camera_DE0B76CB_E561_A06C_41D0_BEAD0CA474CA); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -98.05,
   "hfov": 5.4,
   "pitch": 0.1
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F052B58D_E4E3_E0E4_41E6_7027C134E5A9",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FA40BF_E57F_A023_41E5_3D97D3498352",
   "yaw": 100.79,
   "pitch": 0.62,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.4,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B, this.camera_DE7136D2_E561_A07C_41C1_4D18EE680B7F); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 100.79,
   "hfov": 5.4,
   "pitch": 0.62
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F052958D_E4E3_E0E4_4186_FB8AAFDBAED6",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FA90BF_E57F_A023_41E0_58AF647C9BF9",
   "yaw": -85.99,
   "pitch": -13.83,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.9,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41, this.camera_DE6616D9_E561_A06C_41A8_522D80F45AB7); this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_1_HS_4_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -85.99,
   "hfov": 9.9,
   "pitch": -13.83
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F052F58D_E4E3_E0E4_41D2_DFBB22D31E92",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "LensFlarePanoramaOverlay",
 "yaw": -101.68,
 "pitch": 30.25,
 "bleachingDistance": 0.4,
 "id": "overlay_F052C58D_E4E3_E0E4_41D4_1A85F94F9D80",
 "bleaching": 0.7
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EADEEB79_C10E_F06E_41D7_74789C1446C3",
   "yaw": -47.05,
   "pitch": -12.5,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.97,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB, this.camera_DF47B63B_E561_A023_41E5_54B4824B4283); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -47.05,
   "hfov": 11.97,
   "pitch": -12.5
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_D107272E_C101_B1E2_41BE_1E120D1B0641",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD2DB82_C10E_F0A3_41DF_8017059EB5FD",
   "yaw": 115.83,
   "pitch": -3.44,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.39,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0, this.camera_DBE864E6_E561_A024_41DB_FA31DCC1837D); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 115.83,
   "hfov": 5.39,
   "pitch": -3.44
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_CE9CA1F2_C106_9063_41E7_41F73EE5A14D",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FBA0BE_E57F_A025_41E2_A71091F8EC6B",
   "yaw": -174.7,
   "pitch": 0.03,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.4,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD, this.camera_DFB0664A_E561_A06C_41A9_41068E2801CA); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -174.7,
   "hfov": 5.4,
   "pitch": 0.03
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F0FF323F_E4E6_6024_41E2_A06C3A9C838D",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FBC0BF_E57F_A024_41E4_157A20B0F118",
   "yaw": 5.81,
   "pitch": 1.9,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.54,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41, this.camera_DF4DA642_E561_A05D_41E6_4D096A5B833E); this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 5.81,
   "hfov": 5.54,
   "pitch": 1.9
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_FAD6E4B3_E523_A03C_41E1_8FE4594B6CBA",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FB80BE_E57F_A025_41EA_183C7F739D38",
   "yaw": -167.23,
   "pitch": -8.13,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.35,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80, this.camera_DAAFE543_E561_A063_41E2_95C57AA9DCA2); this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_1_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -167.23,
   "hfov": 5.35,
   "pitch": -8.13
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F779F99A_E4E2_A0EC_41E9_D6D171E25046",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FAC0BF_E57F_A023_41EA_1C6F5BA5F8A2",
   "yaw": -77.9,
   "pitch": -4.24,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.39,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193, this.camera_DABD153C_E561_A025_41E1_8F463FC947A9); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -77.9,
   "hfov": 5.39,
   "pitch": -4.24
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F189E784_E4E3_A0E4_41EB_D438FF93F235",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7F910BF_E57F_A023_41CF_0100B84E1987",
   "yaw": 102.26,
   "pitch": -11.57,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.99,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88, this.camera_DA4A2535_E561_A027_41C7_59CD32E3E46A); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_1_HS_4_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 102.26,
   "hfov": 9.99,
   "pitch": -11.57
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F1881784_E4E3_A0E4_41C5_9F8794074D2C",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "LensFlarePanoramaOverlay",
 "yaw": 62.2,
 "pitch": 21.72,
 "bleachingDistance": 0.4,
 "id": "overlay_F1883784_E4E3_A0E4_419A_02B55621D3FB",
 "bleaching": 0.7
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7F920C0_E57F_A05C_41BF_22380C343C5C",
   "yaw": 174.84,
   "pitch": -7.65,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.1,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F0FF423F_E4E6_6024_41CC_312C315119C2, this.camera_DA59252E_E561_A024_41D6_F8F513A32DB1); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_1_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 174.84,
   "hfov": 7.1,
   "pitch": -7.65
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_C522C89E_E522_A0E5_41CF_CA67B42D477D",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_1217CFCC_79A1_010B_41BB_F2BDB13C4FEC",
   "yaw": 0.71,
   "pitch": -29.84,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.94,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 27)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_1_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.71,
   "hfov": 14.94,
   "pitch": -29.84
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_6FBE7ED0_76E3_06B7_41D6_605F850C71A4",
 "data": {
  "label": "Image"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FB30BD_E57F_A027_41E9_5CB6B61BFC3A",
   "yaw": -85.61,
   "pitch": -0.32,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.4,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788, this.camera_DFFB967C_E561_A024_41C3_6A482FBBA398); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -85.61,
   "hfov": 5.4,
   "pitch": -0.32
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F0984921_E4E6_61DC_41E0_90DD17DFD596",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FB50BD_E57F_A027_41CF_9FBECE8E768A",
   "yaw": -35.45,
   "pitch": -28.59,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.96,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F, this.camera_DFE02682_E561_A0DC_41DE_247E27DFE132); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_1_HS_4_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -35.45,
   "hfov": 8.96,
   "pitch": -28.59
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F0983921_E4E6_61DC_41D8_6100420DEF67",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FB60BD_E57F_A026_41A4_00913E298303",
   "yaw": 65.84,
   "pitch": -2.21,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.81,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_1_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 65.84,
   "hfov": 6.81,
   "pitch": -2.21
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F9ED71FF_E521_A023_41BA_44C2C228A0FF",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FA10BF_E57F_A024_41E7_57C14043C6F8",
   "yaw": -164.97,
   "pitch": -3.27,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.39,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD, this.camera_DA80A551_E561_A07F_41EB_A52B0B0E1A81); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -164.97,
   "hfov": 5.39,
   "pitch": -3.27
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F7F4646C_E4E1_A025_41D0_03E0B99A7ED1",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "LensFlarePanoramaOverlay",
 "yaw": 151.14,
 "pitch": 18.23,
 "bleachingDistance": 0.4,
 "id": "overlay_AD570C78_BAB6_E042_41C7_E5302432791D",
 "bleaching": 0.7
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FDE0BA_E57F_A02D_41EB_C11812156DA5",
   "yaw": 113.3,
   "pitch": -5.05,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.38,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 113.3,
   "hfov": 5.38,
   "pitch": -5.05
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F748692C_E4E3_A024_41EC_57DF353B7125",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FC00BA_E57F_A02D_41E0_CA25CF89F7A8",
   "yaw": 112.74,
   "pitch": -29.4,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.89,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193, this.camera_DE04B6C4_E561_A065_41CF_D0BEC6044906); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_1_HS_5_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 112.74,
   "hfov": 8.89,
   "pitch": -29.4
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F748A92C_E4E3_A024_41E0_45A5140C47B3",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FC20BA_E57F_A02D_41CB_69970B6B4712",
   "yaw": -87.32,
   "pitch": -28.94,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.93,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F7E00372_E4EE_603D_41EA_A612E89349F8, this.camera_DE1E26BD_E561_A024_41DC_1C656ADFFCDB); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_1_HS_6_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -87.32,
   "hfov": 8.93,
   "pitch": -28.94
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F748F92C_E4E3_A024_41E5_7D449DBAD90F",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FC70BB_E57F_A02C_41C7_1AE8AE10131D",
   "yaw": -169.24,
   "pitch": -13.83,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.9,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_1_HS_7_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -169.24,
   "hfov": 9.9,
   "pitch": -13.83
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F74B092C_E4E3_A024_41AB_84F5CAE8CA8F",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD3CB80_C10E_F09F_41DE_4FD92593FB15",
   "yaw": 13.46,
   "pitch": -0.53,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.86,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 13.46,
   "hfov": 4.86,
   "pitch": -0.53
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_E1C7F041_C102_8FA1_41BB_DD0F8AC19348",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD21B81_C10E_F0A1_41BB_E44A7305FA87",
   "yaw": 100.31,
   "pitch": -33.59,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.53,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D131A6F6_C107_9063_41B9_504D378B08B6, this.camera_DBF064D7_E561_A063_41C4_7124F62B9308); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_1_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 100.31,
   "hfov": 8.53,
   "pitch": -33.59
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_E44FB814_C103_7FA7_41DE_D6E2BC6E0FE9",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD27B81_C10E_F0A1_41E2_1ED3E2E5ABE7",
   "yaw": -170.25,
   "pitch": -3.02,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.23,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A, this.camera_DBE644DE_E561_A065_41E9_DA7C83E762BE); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -170.25,
   "hfov": 10.23,
   "pitch": -3.02
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_E08254B0_C101_70FF_41E4_044B644C5989",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "map": {
  "width": 152.05,
  "x": 141.59,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_0_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 384.64,
  "offsetY": 0,
  "height": 146.29,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 141.59,
  "height": 146.29,
  "y": 384.64,
  "width": 152.05,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_0.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C1F8D0E6_E562_6024_41EA_72A65B1EA231"
},
{
 "map": {
  "width": 152.05,
  "x": 294.28,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_1_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 226.3,
  "offsetY": 0,
  "height": 146.29,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 294.28,
  "height": 146.29,
  "y": 226.3,
  "width": 152.05,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_1.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C1F8C0E6_E562_6024_41EA_4AEBA95EADFA"
},
{
 "map": {
  "width": 152.05,
  "x": 504.49,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_2_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 319.78,
  "offsetY": 0,
  "height": 146.29,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 504.49,
  "height": 146.29,
  "y": 319.78,
  "width": 152.05,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_2.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C1F8B0E6_E562_6024_41E4_258F9E961D52"
},
{
 "map": {
  "width": 152.05,
  "x": 842.1,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_3_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 626.3,
  "offsetY": 0,
  "height": 146.29,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 842.1,
  "height": 146.29,
  "y": 626.3,
  "width": 152.05,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_3.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C1F8A0E6_E562_6024_41D0_E0875DE22174"
},
{
 "map": {
  "width": 152.05,
  "x": 471.74,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_4_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 1248.62,
  "offsetY": 0,
  "height": 146.29,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 471.74,
  "height": 146.29,
  "y": 1248.62,
  "width": 152.05,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_4.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C1F890E6_E562_6024_41EB_DA1874C06A28"
},
{
 "map": {
  "width": 152.05,
  "x": 525.8,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_5_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 742.03,
  "offsetY": 0,
  "height": 146.29,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 525.8,
  "height": 146.29,
  "y": 742.03,
  "width": 152.05,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_5.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C1F880E6_E562_6024_41CF_4F9BC867EAD1"
},
{
 "map": {
  "width": 152.05,
  "x": 372.46,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_6_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 880.51,
  "offsetY": 0,
  "height": 146.29,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 372.46,
  "height": 146.29,
  "y": 880.51,
  "width": 152.05,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_6.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C1F870E6_E562_6024_41E9_1E5AC3A7CEFF"
},
{
 "map": {
  "width": 152.05,
  "x": 382.9,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_7_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 602.75,
  "offsetY": 0,
  "height": 146.29,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 382.9,
  "height": 146.29,
  "y": 602.75,
  "width": 152.05,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_7.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C1F860E6_E562_6024_41DB_54A59C9EE4DC"
},
{
 "map": {
  "width": 152.05,
  "x": 261.88,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_8_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 518.41,
  "offsetY": 0,
  "height": 146.29,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 261.88,
  "height": 146.29,
  "y": 518.41,
  "width": 152.05,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_8.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C1F840E6_E562_6024_41D9_A5A93E0C82BF"
},
{
 "map": {
  "width": 152.05,
  "x": 603.91,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_9_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 561.59,
  "offsetY": 0,
  "height": 146.29,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 603.91,
  "height": 146.29,
  "y": 561.59,
  "width": 152.05,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_9.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C1F830E6_E562_6024_41D8_43D1B03AAA26"
},
{
 "map": {
  "width": 152.05,
  "x": 253.12,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_10_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 722.39,
  "offsetY": 0,
  "height": 146.29,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 253.12,
  "height": 146.29,
  "y": 722.39,
  "width": 152.05,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_10.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C1F820E6_E562_6024_41E6_19B5E9C8A6C7"
},
{
 "map": {
  "width": 152.05,
  "x": 684.35,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_11_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 738.33,
  "offsetY": 0,
  "height": 146.29,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 684.35,
  "height": 146.29,
  "y": 738.33,
  "width": 152.05,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_11.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 32)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C1F810E6_E562_6024_41E5_7469C6009F0D"
},
{
 "map": {
  "width": 152.05,
  "x": 567.83,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_12_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 987.1,
  "offsetY": 0,
  "height": 146.29,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 567.83,
  "height": 146.29,
  "y": 987.1,
  "width": 152.05,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_C1F8E0E6_E562_6024_41E3_CFBE8A130A57_HS_12.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C1F800E6_E562_6024_41D6_61020164B27F"
},
{
 "class": "LensFlarePanoramaOverlay",
 "yaw": 6.63,
 "pitch": 24.7,
 "bleachingDistance": 0.4,
 "id": "overlay_AD504EBD_BAB7_20C2_41D0_3B08C5F4468A",
 "bleaching": 0.7
},
{
 "map": {
  "width": 152.05,
  "x": 531.96,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_EA313A8B_E4E2_60EC_41D7_1B2B5A51BF47_HS_2_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 510.58,
  "offsetY": 0,
  "height": 146.29,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 531.96,
  "height": 146.29,
  "y": 510.58,
  "width": 152.05,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_EA313A8B_E4E2_60EC_41D7_1B2B5A51BF47_HS_2.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  }
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_EA311A8B_E4E2_60EC_41E5_051D14B1E36B"
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD1FB7A_C10E_F063_41E3_E96C59ECA578",
   "yaw": 162.79,
   "pitch": -25.12,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.84,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D107072D_C101_B1E1_41C3_F79721CA7165, this.camera_DE3F96A7_E561_A024_41D9_3B7EAF2DF353); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 162.79,
   "hfov": 11.84,
   "pitch": -25.12
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_CEE12826_C101_9FE3_41C2_1490CED1DAAC",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD1DB7A_C10E_F063_41E0_8F40584C2113",
   "yaw": -4.06,
   "pitch": -0.33,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.31,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4, this.camera_DFC36698_E561_A0EC_41BF_B442A88A45EB); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.06,
   "hfov": 11.31,
   "pitch": -0.33
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_CEE13826_C101_9FE3_41D0_C985BFEBBAB3",
 "data": {
  "label": "Circle Arrow 01"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "levels": [
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0_HS_2_0.png",
      "width": 457,
      "class": "ImageResourceLevel",
      "height": 395
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.21,
   "hfov": 19.56,
   "yaw": -1.57,
   "distance": 50
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4, this.camera_DFC9269F_E561_A0E4_41E3_F9C399903276); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_0_HS_2_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.57,
   "hfov": 19.56,
   "pitch": -13.21
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_CEE0C826_C101_9FE3_41DC_2BBDA83A72A1",
 "data": {
  "label": "To The Apartments"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD11B79_C10E_F061_41D4_B6CFF959FD53",
   "yaw": 42.52,
   "pitch": -2.93,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.19,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F7E00372_E4EE_603D_41EA_A612E89349F8, this.camera_DF1845E9_E561_A02C_41E6_E2C967631A7A); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 42.52,
   "hfov": 10.19,
   "pitch": -2.93
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_D10B1750_C103_F1BF_41E2_5D717C4C761C",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "levels": [
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0_HS_2_0.png",
      "width": 477,
      "class": "ImageResourceLevel",
      "height": 395
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.37,
   "hfov": 20.04,
   "yaw": 48.03,
   "distance": 50
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F7E00372_E4EE_603D_41EA_A612E89349F8, this.camera_DF0465F2_E561_A03C_4184_21E55B1BB5F8); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0_HS_2_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 48.03,
   "hfov": 20.04,
   "pitch": -17.37
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_D10B0750_C103_F1BF_41D4_9D1FA3938925",
 "data": {
  "label": "2 Bedroom Apartment"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "levels": [
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0_HS_3_0.png",
      "width": 477,
      "class": "ImageResourceLevel",
      "height": 395
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.55,
   "hfov": 20.02,
   "yaw": -30.29,
   "distance": 50
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7, this.camera_DF0A1601_E561_A3DF_41DB_423A15B3D8BF); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0_HS_3_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -30.29,
   "hfov": 20.02,
   "pitch": -17.55
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_D10B7750_C103_F1BF_41E4_0272AC77F3A0",
 "data": {
  "label": "1 Bedroom Apartment"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD14B7A_C10E_F063_41DE_50C3FECBB732",
   "yaw": -35.97,
   "pitch": -3.45,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.18,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7, this.camera_DF77C609_E561_A3EC_4191_4484F1DD7A22); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -35.97,
   "hfov": 10.18,
   "pitch": -3.45
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_D10B6750_C103_F1BF_41DE_8476FAF284E6",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0_HS_6_0.png",
      "width": 178,
      "class": "ImageResourceLevel",
      "height": 180
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.36,
   "hfov": 7.73,
   "yaw": 124.7
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB, this.camera_DF0155FA_E561_A02C_41BD_0D9CB7EF631B); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_0_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 124.7,
   "hfov": 7.73,
   "pitch": -9.36
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_DA98E58F_CB39_E0DD_41E7_D734614B7C7C",
 "data": {
  "label": "Circle Arrow 01"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FD20B9_E57F_A02F_41B6_C28D12C0B11D",
   "yaw": 43.32,
   "pitch": -25.23,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.23,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD, this.camera_DB9014C1_E561_A05F_41E0_26C2EC5EE50B); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_1_HS_3_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 43.32,
   "hfov": 9.23,
   "pitch": -25.23
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F7EFE372_E4EE_603D_41DB_F31DF0CF7CB2",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FD70B9_E57F_A02F_41DD_91DC1A39EFDB",
   "yaw": -157.49,
   "pitch": -2.41,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.4,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4, this.camera_DBBF74AA_E561_A02C_41E1_A6A6CAEB2C6E); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -157.49,
   "hfov": 5.4,
   "pitch": -2.41
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F7EFF373_E4EE_603C_4183_FD2DF7151F3C",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FD90BA_E57F_A02C_41EB_92C72D3FC35E",
   "yaw": -43.51,
   "pitch": -30.44,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.79,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE, this.camera_DBA414B3_E561_A03C_41D1_F625A81F17BE); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_1_HS_5_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -43.51,
   "hfov": 8.79,
   "pitch": -30.44
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F7EFD373_E4EE_603C_41D8_F4EA0DCB6CC4",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FDB0BA_E57F_A02C_41E1_C31D7B2E41EB",
   "yaw": 26.83,
   "pitch": -14.81,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.86,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193, this.camera_DBAA04BA_E561_A02C_41EA_330D19953E28); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_1_HS_6_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 26.83,
   "hfov": 9.86,
   "pitch": -14.81
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F7EFB373_E4EE_603C_41E8_343581AACD0D",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FDD0BA_E57F_A02C_41E5_1272A8D1FCBF",
   "yaw": 11.1,
   "pitch": -2.97,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.19,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_1_HS_7_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 11.1,
   "hfov": 4.19,
   "pitch": -2.97
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_F7EF9373_E4EE_603C_41E5_726C94E3F677",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD06B7C_C10E_F067_41E2_08637BCF198C",
   "yaw": -11.49,
   "pitch": -22.15,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.45,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_DEC2337E_C11F_B062_41D0_887443DF32B4, this.camera_DA75C519_E561_A1EC_41E9_97C30C8A9B3F); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_1_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -11.49,
   "hfov": 9.45,
   "pitch": -22.15
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_CE8F18BC_C106_F0E6_41E7_B826FC094B00",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD04B7D_C10E_F061_41D6_C52D95856233",
   "yaw": 75.17,
   "pitch": -36.64,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.18,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE, this.camera_DA030511_E561_A1FC_41E1_1F69B60D2905); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_1_HS_2_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 75.17,
   "hfov": 8.18,
   "pitch": -36.64
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_CE8F48BC_C106_F0E6_4197_6ECCE672B4E4",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7FF60B7_E57F_A024_41E5_D9135E0F9C80",
   "yaw": -67.85,
   "pitch": -0.86,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.8,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A, this.camera_DA10E50A_E561_A1EC_41CE_6C1B319FF3EC); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -67.85,
   "hfov": 4.8,
   "pitch": -0.86
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_CE8FA8BC_C106_F0E7_41BE_432A79107D62",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD0FB7D_C10E_F061_41E3_5896602CF4AD",
   "yaw": -162.55,
   "pitch": 0.2,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.4,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4, this.camera_DA2E0502_E561_A1DD_41E7_1F3DCC220AA6); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_1_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -162.55,
   "hfov": 5.4,
   "pitch": 0.2
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_CE8E78BC_C106_F0E7_41D5_A4D86D7D3340",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD0DB7E_C10E_F063_41E2_DB5CA59AAAD7",
   "yaw": 127.44,
   "pitch": -25.1,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.24,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7, this.camera_DF519634_E561_A025_41E0_04DB1DBCFECF); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 127.44,
   "hfov": 9.24,
   "pitch": -25.1
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_E3359815_C101_BFA1_4191_0A807803AF86",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD32B7E_C10E_F063_41D1_2367DB4F687D",
   "yaw": 2.4,
   "pitch": -25.63,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.2,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_1_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.4,
   "hfov": 9.2,
   "pitch": -25.63
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_DE228901_C101_91A1_41E2_F93DC7B552E1",
 "data": {
  "label": "Circle 03a"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EAD30B7E_C10E_F063_41DC_AFBC741747AD",
   "yaw": -67.08,
   "pitch": 0.98,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.48,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D131A6F6_C107_9063_41B9_504D378B08B6, this.camera_DF69E62D_E561_A027_41EC_0B0D801B2B45); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -67.08,
   "hfov": 6.48,
   "pitch": 0.98
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_E0533E34_C106_B3E7_41E0_5417BC6587A4",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7F9C0C1_E57F_A05C_41E9_94007207881B",
   "yaw": -164.2,
   "pitch": -1.28,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.23,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B, this.camera_DE6CD6E0_E561_A05D_41E7_F555D2E01C84); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -164.2,
   "hfov": 6.23,
   "pitch": -1.28
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_FEFEBD37_E522_6024_41DB_1E00820B34A9",
 "data": {
  "label": "Circle Door 02"
 }
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_1_HS_4_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FCD0BD_E57F_A027_41E0_6057C945EA23",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F7A253EC_E4E6_E024_41CB_78C4DDB2506F_1_HS_5_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FCE0BD_E57F_A027_41E0_FE9F73BD8FAA",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_1_HS_4_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FC90BB_E57F_A02C_417D_8AA196117AF7",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_1_HS_5_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FCB0BB_E57F_A023_41DC_CA946ED67DF5",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_1_HS_6_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FCD0BB_E57F_A023_417F_45E59513C070",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F71D64F9_E4E3_A02C_41DC_4C573055D193_1_HS_8_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FCE0BB_E57F_A023_41D8_9C0FA59CA95F",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_1_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD34B7F_C10E_F061_41C4_7675212F2CAB",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_1_HS_4_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD39B7F_C10E_F061_41E5_E3330FCD745B",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_CE06A60A_C107_93A3_41D6_2ACDFB79E3EC_1_HS_8_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD3EB80_C10E_F09F_41E7_7903F6B37C42",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_1_HS_6_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD50B84_C10E_F0A6_41BF_D28C2403EE02",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_1_HS_10_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD5BB84_C10E_F0A7_41C2_C7C4DC3478D8",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_CE1BDC90_C107_70BF_41E0_DF8DDB9AFBDE_1_HS_11_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD59B85_C10E_F0A6_41DE_ED80ECC8D4F5",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_CEB3BEF7_C106_F062_41CC_4F36293F779A_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD53B83_C10E_F0A1_41E0_CB7AC761EEEF",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FC40BD_E57F_A024_41CD_33C995F87527",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_1_HS_4_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FC90BD_E57F_A024_41D0_6F9DB67C86AD",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F0B1BAC4_E4E1_A065_41E5_F13221B9916B_1_HS_5_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FCB0BD_E57F_A024_41D9_9F0EBCB2BB92",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD24B81_C10E_F0A1_41D9_F23A991FBFE0",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_1_HS_4_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD2AB82_C10E_F0A3_41DA_CBBFB0F13A15",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D131A6F6_C107_9063_41B9_504D378B08B6_1_HS_5_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD2FB82_C10E_F0A3_41DD_E5AE39BDB7B8",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_1_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FB00BB_E57F_A023_41EA_D78BD5C4E797",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_1_HS_4_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FDA0BC_E57F_A024_41E3_83C61A57D90F",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_1_HS_5_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FDF0BC_E57F_A024_41B5_D3BEF60ABBB1",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_1_HS_6_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FC10BC_E57F_A024_41D6_69FEE7142C37",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F738BE31_E4E3_A03C_41EA_E856C3B1EABD_1_HS_7_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FC30BC_E57F_A024_41E7_A3588339BC34",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_CED91950_C103_71BF_41E5_9F31733A8E82_0_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_F133F417_C103_97A1_41D3_E00D726D5799",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D1235B13_CB59_E1C5_41D4_6591EC6FA95A",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_C6ABA276_CB3B_E04F_41C8_2E28A9C2A99A_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D1232B13_CB59_E1C5_41DB_3708942434AB",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FA30BF_E57F_A024_41E3_27C37F54EF28",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FA40BF_E57F_A023_41E5_3D97D3498352",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F052A58D_E4E3_E0E4_41DE_E30EF6B8BE88_1_HS_4_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FA90BF_E57F_A023_41E0_58AF647C9BF9",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D107072D_C101_B1E1_41C3_F79721CA7165_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EADEEB79_C10E_F06E_41D7_74789C1446C3",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_CE9C41F2_C106_9063_41E3_9E82926EB85A_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD2DB82_C10E_F0A3_41DF_8017059EB5FD",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FBA0BE_E57F_A025_41E2_A71091F8EC6B",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F0FF423F_E4E6_6024_41CC_312C315119C2_1_HS_4_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FBC0BF_E57F_A024_41E4_157A20B0F118",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F779C99A_E4E2_A0EC_41E7_3AF4F18CB788_1_HS_5_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FB80BE_E57F_A025_41EA_183C7F739D38",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FAC0BF_E57F_A023_41EA_1C6F5BA5F8A2",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_1_HS_4_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7F910BF_E57F_A023_41CF_0100B84E1987",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F189D784_E4E3_A0E4_41D0_21CF0A565D41_1_HS_5_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7F920C0_E57F_A05C_41BF_22380C343C5C",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_6E538CDE_769F_0AAA_41C2_8CE1820662F0_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_1217CFCC_79A1_010B_41BB_F2BDB13C4FEC",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FB30BD_E57F_A027_41E9_5CB6B61BFC3A",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_1_HS_4_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FB50BD_E57F_A027_41CF_9FBECE8E768A",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F0985921_E4E6_61DC_41C4_98BC8F2CAC80_1_HS_5_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FB60BD_E57F_A026_41A4_00913E298303",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F7F4446C_E4E1_A025_41E7_2869E2AC0D10_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FA10BF_E57F_A024_41E7_57C14043C6F8",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FDE0BA_E57F_A02D_41EB_C11812156DA5",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_1_HS_5_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FC00BA_E57F_A02D_41E0_CA25CF89F7A8",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_1_HS_6_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FC20BA_E57F_A02D_41CB_69970B6B4712",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F748492C_E4E3_A024_41DE_F9C31285F3CE_1_HS_7_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FC70BB_E57F_A02C_41C7_1AE8AE10131D",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD3CB80_C10E_F09F_41DE_4FD92593FB15",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD21B81_C10E_F0A1_41BB_E44A7305FA87",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_E154BD2D_C10F_B1E1_41D7_FECCCA3C65A0_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD27B81_C10E_F0A1_41E2_1ED3E2E5ABE7",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD1FB7A_C10E_F063_41E3_E96C59ECA578",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_CEE10826_C101_9FE3_4198_D24D6F4B72CB_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD1DB7A_C10E_F063_41E0_8F40584C2113",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD11B79_C10E_F061_41D4_B6CFF959FD53",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D10B3750_C103_F1BF_41C5_B34AAF7BB5D4_1_HS_4_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD14B7A_C10E_F063_41DE_50C3FECBB732",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_1_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FD20B9_E57F_A02F_41B6_C28D12C0B11D",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_1_HS_4_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FD70B9_E57F_A02F_41DD_91DC1A39EFDB",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_1_HS_5_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FD90BA_E57F_A02C_41EB_92C72D3FC35E",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_1_HS_6_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FDB0BA_E57F_A02C_41E1_C31D7B2E41EB",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F7E00372_E4EE_603D_41EA_A612E89349F8_1_HS_7_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FDD0BA_E57F_A02C_41E5_1272A8D1FCBF",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD06B7C_C10E_F067_41E2_08637BCF198C",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD04B7D_C10E_F061_41D6_C52D95856233",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_0_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7FF60B7_E57F_A024_41E5_D9135E0F9C80",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_CE8EF8BB_C106_F0E1_41E1_D01010D390A7_1_HS_5_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD0FB7D_C10E_F061_41E3_5896602CF4AD",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD0DB7E_C10E_F063_41E2_DB5CA59AAAD7",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD32B7E_C10E_F063_41D1_2367DB4F687D",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_DEC2337E_C11F_B062_41D0_887443DF32B4_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_EAD30B7E_C10E_F063_41DC_AFBC741747AD",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F051B5D0_E4E2_607C_41E6_E1157D3086C8_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7F9C0C1_E57F_A05C_41E9_94007207881B",
 "colCount": 4
}],
 "layout": "absolute"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
