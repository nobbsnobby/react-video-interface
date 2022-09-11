import {MutableRefObject, useEffect, useRef, useState} from "react";
// @ts-ignore
import srcVideo from "../../data/mov_bbb.mp4";
import styled from "styled-components";

let interval: ReturnType<typeof setInterval> | null = null;

function setTime(media: HTMLVideoElement, el: HTMLSpanElement) {
  const minutes = Math.floor(media.currentTime / 60);
  const seconds = Math.floor(media.currentTime - minutes * 60);

  const minuteValue = minutes.toString().padStart(2, '0');
  const secondValue = seconds.toString().padStart(2, '0');

  const mediaTime = `${minuteValue}:${secondValue}`;
  console.log(mediaTime)
  if(el) {
    el.innerHTML = mediaTime
  }
}

const Index = () => {
  const ref = useRef<HTMLVideoElement | null>(null);
  const spanRef = useRef<HTMLSpanElement|null>(null);




  useEffect(() => {
    const el = ref.current;
    const spanEl = spanRef.current
    if(el &&  spanEl) {
      el.addEventListener('timeupdate', () => setTime(el, spanEl))
    }

    return () => {
      // @ts-ignore
      el?.removeEventListener('timeupdate', setTime)
    }
  }, [ref.current])

  const playPauseVideo = () => {
    if(ref.current) {
      if(ref.current.paused) {
        ref.current.play()
      } else {
        ref.current.pause()
      }
    }
  }

  return (
    <VideoWrapper>
      <video autoPlay src={srcVideo} width="100%" ref={ref} />
      <PlayButton onClick={playPauseVideo} />
      <Timer>
        <div></div>
        <span ref={spanRef}>00:00</span>
      </Timer>
    </VideoWrapper>
  );
};

export default Index;


const VideoWrapper = styled.div`
  position: relative;
`
const PlayButton = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 50px;
  height: 50px;
  background-color: red;
  opacity: .5;
  transform: translate(-50%, -50%);
  
  cursor: pointer;
`
const Timer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  background-color: red;
  opacity: .5;
  div {
    width: 40px;
    height: 40px;
    background-color: green;
  }
`
