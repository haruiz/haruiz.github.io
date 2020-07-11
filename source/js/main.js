document.addEventListener('DOMContentLoaded', (event) => {

    var options = {
        strings: ["I'm a Data Science", "I'm a ML and DL Engineer", "I'm Henry Ruiz"],
        typeSpeed: 50
    };
    var typed = new Typed('#typed_text', options);



    document.querySelectorAll('pre.code code').forEach((block) => {
        hljs.highlightBlock(block);
        hljs.lineNumbersBlock(block);
        var button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Copy';
        block.parentNode.appendChild(button);
    });

    var copyCode = new ClipboardJS('.copy-button', {
        target: function (trigger) {
            return trigger.previousElementSibling;
        }
    });

// success message
    copyCode.on('success', function (event) {
        event.clearSelection();
        event.trigger.textContent = 'Copied';
        window.setTimeout(function () {
            event.trigger.textContent = 'Copy';
        }, 2000);
    });
// error message
    copyCode.on('error', function (event) {
        event.trigger.textContent = 'Press "Ctrl + C" to copy';
        window.setTimeout(function () {
            event.trigger.textContent = 'Copy';
        }, 2000);
    });

    document.querySelectorAll('.equation').forEach((block) => {
        katex.render(String.raw`${block.textContent}`, block, {
            throwOnError: false
        });
    });

    //references
    // const Cite = require('citation-js')
    // let example = new Cite('https://blog.sverrirs.com/2016/04/custom-jekyll-tags.html')
    // let output = example.format('bibliography', { format: 'html', template: 'apa', lang: 'en-US'  })
    // alert(output)
    littlefoot.default()

    window.init_zoombox_settings = {
        settings_zoom_doNotGoBeyond1X:'off'
        ,design_skin:'skin-nebula'
        ,settings_enableSwipe:'off'
        ,settings_enableSwipeOnDesktop:'off'
        ,settings_galleryMenu:'dock'
        ,settings_useImageTag:'on'
        ,settings_paddingHorizontal : '100'
        ,settings_paddingVertical : '100'
        ,settings_disablezoom:'off'
        ,settings_transition : 'fade'
        ,settings_transition_out : 'fade'
        ,settings_transition_gallery : 'slide'
        ,settings_disableSocial: 'on'
        ,settings_zoom_use_multi_dimension: 'off'
    };

});



var _gaq = _gaq || [];
_gaq.push(['_setAccount', '{{ site.google_analytics }}']);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();