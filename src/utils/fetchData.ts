import { GetStaticProps, NextPage } from 'next';
import { Experience, PageInfo, Project, Skill, Social } from '../../typing';
import { fetchPageInfo } from './fetchPageInfo';
import { fetchExperience } from './fetchExperiences';
import { fetchSkills } from './fetchSkills';
import { fetchSocial } from './fetchSocial';
import { fetchProjects } from './fetchProjects';

export type Props = {
pageInfo: PageInfo;
experiences: Experience[];
skills: Skill[];
projects: Project[];
socials: Social[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo: PageInfo = await fetchPageInfo();
  const experiences: Experience[] = await fetchExperience();
  const skills: Skill[] = await fetchSkills();
  const socials: Social[] = await fetchSocial();
  const projects: Project[] = await fetchProjects();

  return {
    props: {
      pageInfo,
      experiences,
      skills,
      socials,
      projects,
    },
  };
};

