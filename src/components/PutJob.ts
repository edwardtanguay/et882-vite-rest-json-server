import { appData, redrawSite } from "../appContext";

export const PutJob = () => {

	const { baseUrl, jobs } = appData;

	setTimeout(() => {
		const formElem = document.querySelector<HTMLInputElement>('.putJob form');
		const displayElem = document.querySelector<HTMLDivElement>('.putJob .display');
		const titleElem = document.querySelector<HTMLInputElement>('.putJob .title');
		const companyElem = document.querySelector<HTMLInputElement>('.putJob .company');
		const urlElem = document.querySelector<HTMLInputElement>('.putJob .url');
		const descriptionElem = document.querySelector<HTMLInputElement>('.putJob .description');
		const skillListElem = document.querySelector<HTMLInputElement>('.putJob .skillList');
		const publicationDateElem = document.querySelector<HTMLInputElement>('.putJob .publicationDate');

		const job = jobs[0];

		if (formElem && displayElem && titleElem && companyElem && urlElem && descriptionElem && skillListElem && publicationDateElem) {

			titleElem.value = job.title;
			companyElem.value = job.company;
			urlElem.value = job.url;
			descriptionElem.value = job.description;
			skillListElem.value = job.skillList;
			publicationDateElem.value = job.publicationDate;
			
			formElem.addEventListener('submit', async (e) => {
				e.preventDefault();
				const formElem = e.target as HTMLFormElement;
				const formData = new FormData(formElem);

				const changedJob: any = {};
				for (const [key, value] of formData.entries()) {
					changedJob[key] = value;
				}

				const response = await fetch(`${baseUrl}/jobs/${job.id}`,
					{
						method: 'PUT',
						headers: {
							'Access-Control-Allow-Origin': '*',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(changedJob)
					});

				if (response.status === 200) {
					const newJob = await response.json();
					displayElem.innerHTML = `
						<div class="job">
							<div>Job with ID ${newJob.id} was changed.</div>	
						</div>
					`;
					redrawSite();
				} else {
					displayElem.innerHTML = `
						<div class="error">Job could not be changed.</div>
					`
				}
			})
		}

	})

	return /*html*/ `
		<style>
			.putJob .jobId {
				width: 2rem;
				margin-right: .3rem;
				text-align: right;
			}
			.putJob input {
				width: 98%;
			}
		</style>
	 	<fieldset class="component putJob">
			<legend>Put Job <span>(with fetch)</span></legend>
			<form>
				<div>Title: <input class="title" name="title"/></div>
				<div>Company: <input class="company" name="company"/></div>
				<div>URL: <input class="url" name="url"/></div>
				<div>Description: <input class="description" name="description"/></div>
				<div>Skill List: <input class="skillList" name="skillList"/></div>
				<div>Publication Date: <input class="publicationDate" name="publicationDate"/></div>
				<div><button>Change</button></div>

			</form>
			<div class="display"></div>
		</fieldset>
	`
}