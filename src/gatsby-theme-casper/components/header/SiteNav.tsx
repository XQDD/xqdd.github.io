// tslint:disable:no-http-string
import { Link, StaticQuery, graphql } from "gatsby"
import * as React from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/core"

import { SocialLink } from "gatsby-theme-casper/src/styles/shared"
import Facebook from "gatsby-theme-casper/src/components/icons/facebook"
import Twitter from "gatsby-theme-casper/src/components/icons/twitter"
import SubscribeModal from "gatsby-theme-casper/src/components/subscribe/SubscribeOverlay"
import SiteNavLogo from "gatsby-theme-casper/src/components/header/SiteNavLogo"
import music from "./icons/music.svg"
import bilibili from "./icons/bilibili.svg"
import github from "./icons/github.svg"
import gitee from "./icons/gitee.png"
import gitlab from "./icons/gitlab.svg"

const HomeNavRaise = css`
  @media (min-width: 900px) {
    position: relative;
    top: -70px;
  }
`

const SiteNavStyles = css`
  position: relative;
  z-index: 300;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  overflow-y: hidden;
  height: 40px;
  font-size: 1.2rem;
`

const SiteNavLeft = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  margin-right: 10px;
  padding-bottom: 80px;
  letter-spacing: 0.4px;
  white-space: nowrap;

  -ms-overflow-scrolling: touch;

  @media (max-width: 700px) {
    margin-right: 0;
    padding-left: 4vw;
  }
`

const NavStyles = css`
  display: flex;
  margin: 0 0 0 -12px;
  padding: 0;
  list-style: none;

  li {
    display: block;
    margin: 0;
    padding: 0;
    text-transform: uppercase;
  }

  li a {
    display: block;
    margin: 0;
    padding: 10px 12px;
    color: #fff;
    opacity: 0.8;
  }

  li a:hover {
    text-decoration: none;
    opacity: 1;
  }
`

const SiteNavRight = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: 40px;

  @media (max-width: 700px) {
    display: none;
  }
`

const SocialLinks = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  a:last-of-type {
    padding-right: 20px;
  }
`

const SubscribeButton = styled.a`
  display: block;
  padding: 4px 10px;
  border: #fff 1px solid;
  color: #fff;
  font-size: 1.2rem;
  line-height: 1em;
  border-radius: 10px;
  opacity: 0.8;

  :hover {
    text-decoration: none;
    opacity: 1;
    cursor: pointer;
  }
`

interface SiteNavProps {
  isHome?: boolean;
}

interface SiteNavData {
  site: {
    siteMetadata: {
      title: string;
      facebook?: string;
      twitter?: string;
      showSubscribe: boolean;
    };
  };
}

class SiteNav extends React.Component<SiteNavProps> {
  subscribe = React.createRef<SubscribeModal>()

  openModal = () => {
    if (this.subscribe.current) {
      this.subscribe.current.open()
    }
  }

  render() {
    const { isHome = false } = this.props
    return (
      <StaticQuery
        query={graphql`
          query {
            site {
              siteMetadata {
                title
                facebook
                twitter
                footer
              }
            }
          }
        `}
        // tslint:disable-next-line:react-this-binding-issue
        render={(props: SiteNavData) => {
          const config = props.site.siteMetadata
          return (
            <nav css={[isHome && HomeNavRaise, SiteNavStyles]}>
              <SiteNavLeft>
                {!isHome && <SiteNavLogo />}
                <ul css={NavStyles} role="menu">
                  {/* TODO: mark current nav item - add class nav-current */}
                  <li role="menuitem">
                    <Link to="/">Home</Link>
                  </li>
                  <li role="menuitem">
                    <Link to="/about">About</Link>
                  </li>
                  {/*<li role="menuitem">*/}
                  {/*  <Link to="/tags/getting-started/">Getting Started</Link>*/}
                  {/*</li>*/}
                </ul>
              </SiteNavLeft>
              <SiteNavRight>
                <SocialLinks>

                  <a
                    css={SocialLink}
                    href="https://github.com/XQDD"
                    title="Github"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={github} />
                  </a>


                  <a
                    css={SocialLink}
                    href="https://gitlab.com/XQDD"
                    title="Gitlab"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={gitlab} />
                  </a>


                  <a
                    css={SocialLink}
                    href="https://gitee.com/XQDDIN"
                    title="Gitee"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img style={{ width: "16px", height: "16px" }} src={gitee} />
                  </a>

                  <a
                    css={SocialLink}
                    href="https://space.bilibili.com/15582031"
                    title="BiliBili"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={bilibili} />
                  </a>

                  <a
                    css={SocialLink}
                    href="https://music.163.com/#/user/home?id=101428949"
                    title="Cloud Music"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img style={{ width: "16px", height: "16px" }} src={music} />
                  </a>

                  {config.facebook && (
                    <a
                      css={SocialLink}
                      href={config.facebook}
                      target="_blank"
                      title="Facebook"
                      rel="noopener noreferrer"
                    >
                      <Facebook />
                    </a>
                  )}
                  {config.twitter && (
                    <a
                      css={SocialLink}
                      href={config.twitter}
                      title="Twitter"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter />
                    </a>
                  )}

                </SocialLinks>
                {config.showSubscribe && (
                  <SubscribeButton onClick={this.openModal}>Subscribe</SubscribeButton>
                )}
                {config.showSubscribe && <SubscribeModal ref={this.subscribe} />}
              </SiteNavRight>
            </nav>
          )
        }}
      />
    )
  }
}

export default SiteNav
