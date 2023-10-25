import './style.scss'
import { redrawSite } from './appContext';
import { GetJob } from './components/GetJob';
import { PatchJob } from './components/PatchJob';
import { PostJob } from './components/PostJob';
import { PutJob } from './components/PutJob';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html*/ `
	<h1>Job Postings</h1>
	<p class="jobInfo"></p>
	<p class="skillInfo"></p>
	${GetJob()}
	${PostJob()}
	${PatchJob()}
	${PutJob()}
`
redrawSite();
