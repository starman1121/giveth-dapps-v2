import { useRouter } from 'next/router';
import {
	Button,
	H5,
	brandColors,
	neutralColors,
} from '@giveth/ui-design-system';
import styled from 'styled-components';

import ProjectCard from '@/components/project-card/ProjectCard';
import { IProject } from '@/apollo/types/types';
import Routes from '@/lib/constants/Routes';
import { isUserRegistered } from '@/lib/helpers';
import { FlexCenter } from '@/components/styled-components/Flex';
import useUser from '@/context/UserProvider';
import { mediaQueries } from '@/utils/constants';

interface IHomeExploreProjects {
	projects: IProject[];
	totalCount?: number;
	noTitle?: boolean;
}

const HomeExploreProjects = (props: IHomeExploreProjects) => {
	const { projects, totalCount, noTitle } = props;

	const router = useRouter();
	const {
		state: { user },
		actions: { showCompleteProfile },
	} = useUser();

	const handleCreateButton = () => {
		if (isUserRegistered(user)) {
			router.push(Routes.CreateProject);
		} else {
			showCompleteProfile();
		}
	};

	return (
		<Wrapper>
			{!noTitle && (
				<Title>
					Explore <span>{totalCount} Projects</span>
				</Title>
			)}
			<ProjectsContainer>
				{projects.map(project => (
					<ProjectCard key={project.id} project={project} />
				))}
			</ProjectsContainer>
			<ButtonsWrapper>
				<AllProjectsButton
					buttonType='primary'
					size='large'
					label='SEE ALL PROJECTS'
					onClick={() => router.push(Routes.Projects)}
				/>
				<CreateProject
					buttonType='texty'
					size='large'
					label='Create a Project'
					onClick={handleCreateButton}
				/>
			</ButtonsWrapper>
		</Wrapper>
	);
};

const AllProjectsButton = styled(Button)`
	height: 66px;
	padding: 0 80px;
`;

const CreateProject = styled(Button)`
	height: 66px;
	color: ${brandColors.pinky[500]};
	a {
		font-weight: 400;
	}

	&:hover {
		background-color: transparent;
		color: ${brandColors.pinky[500]};
	}
`;

const ButtonsWrapper = styled(FlexCenter)`
	flex-direction: column;
	margin: 64px auto;
`;

const ProjectsContainer = styled.div`
	display: grid;
	gap: 25px;
	margin-bottom: 64px;

	${mediaQueries.laptop} {
		grid-template-columns: repeat(2, 1fr);
	}

	${mediaQueries.laptopL} {
		grid-template-columns: repeat(3, 1fr);
	}

	${mediaQueries.desktop} {
		grid-template-columns: repeat(4, 1fr);
	}
`;

const Title = styled(H5)`
	margin-bottom: 25px;
	font-weight: 700;

	span {
		color: ${neutralColors.gray[700]};
	}
`;

const Wrapper = styled.div`
	margin: 60px 33px;
	color: ${neutralColors.gray[900]};
	position: relative;
`;

export default HomeExploreProjects;
