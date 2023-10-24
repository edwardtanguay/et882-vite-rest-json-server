import './style.scss'
import { appData } from './appContext';
import { SearchJob } from './components/SearchJob';

const { jobs, skills } = appData;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html*/ `
	<h1>Job Postings</h1>
	<p>There are ${jobs.length} jobs.</p>
	<p>There are ${skills.length} skills.</p>
	${SearchJob()}
`

