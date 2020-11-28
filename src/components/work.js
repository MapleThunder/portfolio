import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import GatsbyImage from "gatsby-image";
import styled from "styled-components";
import { ImLocation } from "react-icons/im";

const WorkSection = styled.section`
  .work-wrapper {
    display: flex;
    flex-direction: column;

    .work-card {
      /* border: solid 2px var(--grey); */
      border-radius: var(--borderRadius);
      /* background-color: var(--cardBg); */
      box-shadow: var(--level-2);
      padding: 10px 15px;
      display: grid;
      grid-template-columns: 1fr auto;

      .gatsby-image-wrapper {
        grid-column: 1 / -1;
      }
      p.title {
        font-size: var(--h5);
        margin: 0;
        grid-column: 1 / 2;
      }
      span {
        font-size: var(--smallText);
        align-self: center;
      }
      p {
        margin: 0;
        grid-column: 1 / -1;

        &.location {
          font-size: var(--smallText);
          align-items: center;
        }
        &:last-child {
          margin-top: 10px;
        }
      }
      & + .work-card {
        margin-top: 10px;
      }
      &:hover,
      &:focus {
        box-shadow: var(--level-3);
      }
      @media only screen and (min-width: 600px) {
        max-width: 400px;
      }
    }
  }
`;

const Work = () => {
  const [max, setMax] = useState(4);
  const data = useStaticQuery(graphql`
    {
      allWorkJson {
        edges {
          node {
            id
            title
            subtitle
            period
            location
            specialization
            icon_light {
              childImageSharp {
                fixed(height: 32) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
            icon_dark {
              childImageSharp {
                fixed(height: 32) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
        }
      }
    }
  `);

  return (
    <WorkSection>
      <h2>Work Experience</h2>
      <p>I have been working professionally as a developer since 2016.</p>
      <div className="work-wrapper">
        {data.allWorkJson.edges.map(({ node }, index) => {
          if (index >= max) {
            return null;
          }
          let cardImage = null;
          if (document.getElementById("body").classList.contains("dark")) {
            cardImage = node.icon_dark.childImageSharp;
          } else {
            cardImage = node.icon_light.childImageSharp;
          }

          return (
            <div key={node.id} className="work-card">
              <GatsbyImage {...cardImage} />
              <p className="title">{node.title}</p>
              <span>({node.period})</span>
              <p>{node.subtitle}</p>
              <p className="location">
                <ImLocation /> {node.location}
              </p>
              <p>{node.specialization}</p>
            </div>
          );
        })}
      </div>
    </WorkSection>
  );
};

export default Work;