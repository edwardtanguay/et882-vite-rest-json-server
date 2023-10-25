export interface IJob {
	id: number,
	title: string,
	company: string,
	url: string,
	description: string,
	skillList: string,
	publicationDate: string
}

export interface ISkill {
	id: number,
	idCode: string,
	name: string,
	url: string,
	description: string
}

export interface IAppData {
	baseUrl: string,
	jobs: IJob[],
	skills: ISkill[]
}