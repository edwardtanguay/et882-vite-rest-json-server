import axios from 'axios';
import { IAppData } from './interface';

const baseUrl = 'http://localhost:5995';

export const appData: IAppData = {
	jobs: await (await fetch(`${baseUrl}/jobs`)).json(),
	skills: (await axios.get(`${baseUrl}/skills`)).data
}