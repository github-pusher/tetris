import styled from 'styled-components';

export default styled.div`
   position: absolute;
   top: 165px;
   left: 48px;
   width: 160px;
   height: 100px;
   overflow: hidden;
   background-image: url("bear-animation-spritesheet.png");
   background-position-x: 0px;
   animation: bear-animation 1s linear infinite;
   
   @keyframes bear-animation {
     0%, 20% {
       background-position-x: 0px;
     }
     20.01%, 40% {
       background-position-x: -160px;
     }
     40.01%, 60% {
       background-position-x: -320px;
     }
     60.01%, 80% {
       background-position-x: -480px;
     }
     80.01%, 99.99% {
       background-position-x: -640px;
     }
     100% {
       background-position-x: -800px;
     }
   }
`;
