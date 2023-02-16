import styled from "styled-components";

export const Wrapper = styled.div`
  position: sticky;
  .searchBarLarge {
    width: 400px;
    margin-left: 30px;
  }
  .searchBarSmall {
    width: 270px;
  }
  .topBar {
    display: flex;
    justify-content: space-between;
    height: 64px;
  }
  .leftSide {
    display: flex;
  }
  .topBarIcons {
    img {
      padding-right: 30px;
      cursor: pointer;
    }
  }
  .ant-input-affix-wrapper {
    background: #283151;
    border: none;
    border-radius: 6px;
  }
  input {
    background: transparent;
    color: white;
  }
  .hamBurgerHide {
    display: none;
  }
  .hamBurgerShow {
    padding: 0px 20px 0px 20px;
    background: #263051;
    cursor: pointer;
  }
  .headingShow {
    color: white;
    font-weight: bold;
    padding-left: 40px;
    margin-right: 650px;
    width: 175px;
  }
  .headingShow-resize {
    color: white;
    font-weight: bold;
    padding-left: 40px;
    width: 175px;
    margin-right: 450px;
  }
  .headingHide {
    display: none;
  }

  .sideDrawerIcon {
    padding: 0px 20px 0px 20px;
    cursor: pointer;
    display: none;
  }

  @media (max-width: 1000px) {
    .hamBurgerShow {
      display: none;
    }
    .headingShow {
      padding-left: 10px !important;
    }
    .sideDrawerIcon {
      display: inline;
    }
    .searchBarLarge {
      margin-left: 0px;
    }
  }

  @media (max-width: 1420px) {
    .headingShow {
      margin-right: 10px;
    }
  }
  @media (max-width: 800px) {
    .searchBarSmall {
      display: none;
    }
    .searchBarLarge {
      width: 200px;
    }
  }

  @media (max-width: 550px) {
    .infoIcon,
    .videoIcon {
      display: none;
    }
    .searchBarLarge {
      display: none;
    }
  }
`;
