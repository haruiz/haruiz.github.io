import React from 'react'

export default function Sticker(props) {
    const el = React.useRef(null);
    const container = React.useRef(null);
    const mask = React.useRef(null);
    const move = React.useRef(null);
    const front = React.useRef(null);
    const back = React.useRef(null);
    const backImg = React.useRef(null);
    const backShadow  = React.useRef(null);
    const depth  = React.useRef(null);

    const [bounds, setBounds] = React.useState(null);
    const size = bounds && bounds.width;    
    const {color,opacity,avatar, ...rest} = props;

    var _direction, _savePos = null,
    _prefixes = ['webkit', 'Moz', 'ms', 'O'],
    _aniTrans = 'all 0.6s cubic-bezier(.23,1,.32,1)',
    _setTrans = 'all 0s';

    const containerStyle = {
        position: 'relative',
        width: size+ 'px',
        height: size+ 'px',
        overflow: 'hidden'        
    }    
    const moveStyle = {
        position: 'relative',
        borderRadius: '50%',
        width: size+ 'px',
        height: size+ 'px',
        overflow: 'hidden'
    }
    const frontStyle ={
        position: 'relative',
        borderRadius: '50%',
        width: size,
        height: size,
        zIndex: 1
    }
    const backStyle ={
        position: 'absolute',
        borderRadius: '50%',
        width: size + 'px',
        height: size + 'px',
        left: '0',
        top: '0',
        zIndex: 3,
        backgroundColor: '#ffffff',
        transform: 'translate(' + size + 'px, ' + 0 + 'px)',
        overflow: 'hidden'
    }
    const backImageStyle = {
        position: 'relative',
        borderRadius: '50%',
        width: size + 'px',
        height: size + 'px',
        opacity: '0.4'
    }
    const backShadowStyle = {
        position: 'absolute',
        width: size + 'px',
        height: size + 'px',
        left: '0',
        top: '0',
        zIndex: 4
    }
    const depthStyle = {
        position: 'absolute',
        width: size + 'px',
        height: size + 'px',
        left: '0',
        top: '0',
        zIndex: 1
    }
    
    function vendor(el, prop) {
        var s = el.style, pp, i;
        prop = prop.charAt(0).toUpperCase() + prop.slice(1);        
        for(i=0; i<_prefixes.length; i++) {
            pp = _prefixes[i]+prop;
            if(s[pp] !== undefined) return pp;
        }
        if(s[prop] !== undefined) return prop;

    }

    function css(el, prop) {
        for (var n in prop) el.style[vendor(el, n)||n] = prop[n];
    }

    if(color){
        frontStyle.backgroundColor = background;        
    }    
    
    if(avatar){                
        frontStyle.backgroundImage = `url(${avatar})`;        
        backImageStyle.backgroundImage = `url(${avatar})`;        
    }    

    if(opacity){        
        depthStyle.opacity = opacity;
        backShadowStyle.opacity = opacity;
    }

    React.useEffect(() => {                
        const bounds = el.current.getBoundingClientRect();
        setBounds(bounds);
        return () => {    
            // destroying code here
        }
    }, [])

    function checkDerection(e, pos, sizeQ) {
        var fx = pos.x, fy = pos.y, tx = e.pageX - fx, ty = e.pageY - fy, direction;
        if (tx < sizeQ) direction = 0; // left
        else if (tx > sizeQ * 3) direction = 1; // right
        else if (ty < sizeQ) direction = 2; // top
        else direction = 3; // bottom
        return direction;
    }

    function checkPos(e, pos, size) {
        var fx = pos.x, fy = pos.y, tx = e.pageX - fx, ty = e.pageY - fy, value,
            a = size - tx, b = size - ty, c = tx >> 1, d = ty >> 1, e = a >> 1, f = b >> 1;
        if (_direction == 0) value = {bx:-size, by:0, sx:-1, sy:1, bs:'shadowL', bmx:-size + tx, bmy:0, bsw:tx, bsh:size, bsx:a, bsy:0, cw:size - c, ch:size, cx:c, cy:0, dw:c, dh:size, dx:c - (c >> 1), dy:0}; // left
        else if (_direction == 1) value = {bx:size, by:0, sx:-1, sy:1, bs:'shadowR', bmx:tx, bmy:0, bsw:a, bsh:size, bsx:0, bsy:0, cw:size - e, ch:size, cx:0, cy:0, dw:e, dh:size, dx:size - a + (e >> 1), dy:0}; // right
        else if (_direction == 2) value = {bx:0, by:-size, sx:1, sy:-1, bs:'shadowT', bmx:0, bmy:-size + ty, bsw:size, bsh:ty, bsx:0, bsy:b, cw:size, ch:size - d, cx:0, cy:d, dw:size, dh:d, dx:0, dy:d - (d >> 1)}; // top
        else value = {bx:0, by:size, sx:1, sy:-1, bs:'shadowB', bmx:0, bmy:ty, bsw:size, bsh:b, bsx:0, bsy:0, cw:size, ch:size - f, cx:0, cy:0, dw:size, dh:f, dx:0, dy:size - b + (f >> 1)}; // bottom
        return value;
    }

    function getShadow(direction){
        if(direction === "shadowL"){            
            return "linear-gradient(to left, rgba(0,0,0,0) 0%,rgba(0,0,0,0.01) 1%,rgba(0,0,0,0.7) 100%)"
        }
        else if(direction === "shadowR"){
            return "linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,0,0,0.01) 1%,rgba(0,0,0,0.7) 100%)"
        }
        else if(direction === "shadowB"){
            return "linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.01) 1%,rgba(0,0,0,0.7) 100%)"
        }
        else{
            return "linear-gradient(to top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.01) 1%,rgba(0,0,0,0.7) 100%)"
        }           
    }

    const onMouseEnter = React.useCallback((evt)=>{
        const sizeQ = size && size >> 2; 
        var cpos = bounds, mpos = {x:cpos.left + window.pageXOffset, y:cpos.top + window.pageYOffset};
        _direction = checkDerection(evt, mpos, sizeQ);
        _savePos = checkPos(evt, mpos, size);
        _savePos.pos = mpos;
        var bx = _savePos.bx, by = _savePos.by, sx = _savePos.sx, sy = _savePos.sy, bs = _savePos.bs;        
        backShadow.current.style.background = depth.current.style.background = getShadow(bs);
        css(mask.current, {
            transition: _setTrans,
            width: size + 'px',
            height: size + 'px',
            transform: 'translate(' + 0 + 'px, ' + 0 + 'px)'
        });
        css(move.current, {
            transition: _setTrans,
            transform: 'translate(' + 0 + 'px, ' + 0 + 'px)'
        });
        css(back.current, {
            transition: _setTrans,
            transform: 'translate(' + bx + 'px, ' + by + 'px)'
        });
        css(backImg.current, {
            transform: 'scaleX(' + sx + ') scaleY(' + sy + ')'
        });
        css(depth.current, {
            transform: 'translate(' + -10000 + 'px, ' + -10000 + 'px)'
        });

    })

    const onMouseLeave = React.useCallback((evt)=>{
        if (_savePos == null) return;
        var bx = _savePos.bx, by = _savePos.by;
        css(mask.current, {
            transition: _aniTrans,
            width: size + 'px',
            height: size + 'px',
            transform: 'translate(' + 0 + 'px, ' + 0 + 'px)'
        });
        css(move.current, {
            transition: _aniTrans,
            transform: 'translate(' + 0 + 'px, ' + 0 + 'px)'
        });
        css(back.current, {
            transition: _aniTrans,
            transform: 'translate(' + bx + 'px, ' + by + 'px)'
        });
        css(depth.current, {
            transform: 'translate(' + -10000 + 'px, ' + -10000 + 'px)'
        });
        _savePos = null;
    })

    const onMouseMove = React.useCallback((evt)=>{
        var pos = checkPos(evt, _savePos.pos, size),
        bmx = pos.bmx, bmy = pos.bmy,
        bsw = pos.bsw, bsh = pos.bsh, bsx = pos.bsx, bsy = pos.bsy,
        cw = pos.cw, ch = pos.ch, cx = pos.cx, cy = pos.cy,
        dw = pos.dw, dh = pos.dh, dx = pos.dx, dy = pos.dy;
        
        css(mask.current, {
            width: cw + 'px',
            height: ch + 'px',
            transform: 'translate(' + cx + 'px, ' + cy + 'px)'
        });
        css(move.current, {
            transform: 'translate(' + -cx + 'px, ' + -cy + 'px)'
        });
        css(back.current, {
            transform: 'translate(' + bmx + 'px, ' + bmy + 'px)'
        });
        css(backShadow.current, {
            width: bsw + 'px',
            height: bsh + 'px',
            transform: 'translate(' + bsx + 'px, ' + bsy + 'px)'
        });
        css(depth.current, {
            width: dw + 'px',
            height: dh + 'px',
            transform: 'translate(' + dx + 'px, ' + dy + 'px)'
        });
    })

    return (
        <div ref={el}  {...rest} 
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        >
            {bounds && (                
                <div ref={container} style={containerStyle}>                    
                    <div ref={mask} style={containerStyle}>
                        <div ref={move} style={moveStyle}>
                            <div ref={front} style={frontStyle}/>
                            <div ref={depth} style={depthStyle}/>
                            <div ref={back} style={backStyle} >
                                <div ref={backImg} style={backImageStyle}/>
                                <div ref={backShadow} style={backShadowStyle}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div> 
    )
}
