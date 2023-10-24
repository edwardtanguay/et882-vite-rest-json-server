import axios from 'axios';
import { IAppData } from './interface';

export const baseUrl = 'http://localhost:5995';

export const appData: IAppData = {
	baseUrl,
	jobs: await (await fetch(`${baseUrl}/jobs`)).json(),
	skills: (await axios.get(`${baseUrl}/skills`)).data
}