import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import styled from "styled-components";
import GatsbyImage from "gatsby-image";

const ProjectsWrapper = styled.section`
  .project-list {
    margin-top: 50px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;

    .card {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-column-gap: 20px;
      padding: 10px;

      p {
        grid-column: 2 / 3;
        margin-top: 0;

        .title {
          font-size: var(--h4);
          font-family: var(--headingFont);
          display: block;

          &:hover,
          &:focus {
            background-color: var(--accent);
          }
        }
      }
      .tags {
        grid-column: 2 / 3;

        .tag {
          display: inline-block;
          background-color: var(--accent);
          padding: 0 10px;
          min-width: 40px;
          margin-left: 3px;
          margin-top: 4px;
          border-radius: 15px;
          color: var(--black);

          &:first-child {
            margin-left: 0;
          }
        }
      }

      .icon {
        align-self: center;
      }

      &:hover,
      &:focus {
        box-shadow: var(--level-3);
      }
    }

    img {
      border-radius: var(--borderRadius);
    }

    @media only screen and (min-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media only screen and (min-width: 800px) {
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 30px;
    }
  }
`;

const Projects = ({ data }) => {
  const { projects } = data;

  return (
    <>
      <Layout>
        <SEO title="Projects" />
        <ProjectsWrapper>
          <h1>Projects</h1>
          <p>
            Massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Arcu
            risus quis varius quam. Nunc consequat interdum varius sit amet
            mattis vulputate enim. Duis ultricies lacus sed turpis tincidunt id
            aliquet risus feugiat.
          </p>
          <div className="project-list">
            {projects.edges.map(project => {
              const { frontmatter, fields } = project.node;

              return (
                <div className="card" key={frontmatter.project_id}>
                  {frontmatter.main_image && (
                    <GatsbyImage
                      className="icon"
                      {...frontmatter.main_image.childImageSharp}
                    />
                  )}
                  <p className="description">
                    <Link to={fields.slug} className="title">
                      {frontmatter.title}
                    </Link>
                    {frontmatter.teaser}
                  </p>
                  <div className="tags">
                    {frontmatter.tags.map(tag => {
                      return (
                        <div className="tag" key={tag}>
                          {tag}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </ProjectsWrapper>
      </Layout>
    </>
  );
};

export default Projects;

export const pageQuery = graphql`
  query {
    projects: allMarkdownRemark(
      filter: { frontmatter: { type_id: { eq: "project" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            project_id
            tags
            teaser
            main_image {
              childImageSharp {
                fixed(width: 100, height: 100) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;
