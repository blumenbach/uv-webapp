
if (document.location.href.indexOf('localhost') != -1){
    // debug version
    document.write('<script type="text/javascript" id="embedWellcomePlayer" src="/src/js/embed.js"><\/script>');
} else {
    // built version
    $('.wellcomePlayer').data('config', '/examples.config');
    document.write('<script type="text/javascript" id="embedWellcomePlayer" src="/build/wellcomeplayer/js/embed.js"><\/script>');
}
