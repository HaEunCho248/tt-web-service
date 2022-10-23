import styled from "styled-components";

const FullpageContainer = styled.div`
  .container1 {
    scroll-behavior: smooth;
    height: 100vh;
    scroll-snap-type: y mandatory;
    scroll-padding-top: 30px;
    overflow-y: scroll;
  }
  .container1::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
  .container1 > div {
    scroll-snap-align: start;
  }
`;

export default FullpageContainer;
