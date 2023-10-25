import axios from 'axios';
import { IAppData } from './interface';

export const baseUrl = 'http://localhost:5995';

export const appData: IAppData = {
	baseUrl,
	jobs: await (await fetch(`${baseUrl}/jobs`)).json(),
	skills: (await axios.get(`${baseUrl}/skills`)).data
}

export const redrawSite = async () => {
	const jobs = await (await fetch(`${baseUrl}/jobs`)).json();
	const skills = (await axios.get(`${baseUrl}/skills`)).data;
	const jobInfoElem = document.querySelector('.jobInfo');
	const skillInfoElem = document.querySelector('.skillInfo');
	if (jobInfoElem && skillInfoElem) {
		jobInfoElem.innerHTML = `There are ${jobs.length} jobs.`;
		skillInfoElem.innerHTML = `There are ${skills.length} skills.`;
	}
}