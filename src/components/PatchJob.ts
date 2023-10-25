import { appData } from "../appContext";
import { IJob } from "../interface";

export const PatchJob = () => {

	const { baseUrl } = appData;

	setTimeout(() => {
		const jobIdElem = document.querySelector<HTMLInputElement>('.patchJob .jobId');
		const formElem = document.querySelector<HTMLInputElement>('.patchJob form');
		const displayElem = document.querySelector<HTMLDivElement>('.patchJob .display');

		if (jobIdElem && formElem && displayElem) {
			formElem.addEventListener('submit', async (e) => {
				e.preventDefault();
				const titleElem = document.querySelector<HTMLInputElement>('.patchJob .title');
				if (titleElem) {
					const changeFields = {
						title: titleElem.value
					};
					const jobId = jobIdElem.value;

					const response = await fetch(`${baseUrl}/jobs/${jobId}`,
						{
							method: 'PATCH',
							headers: {
								'Access-Control-Allow-Origin': '*',
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(changeFields)
						});

					const job: IJob = await response.json();
					if (response.status === 200) {
						displayElem.innerHTML = `
						<div class="job">
							<div>${job.title} (${job.company})</div>	
							<div>${job.skillList}</div>	
						</div>
					`
					} else {
						displayElem.innerHTML = `
						<div class="error">Job with ID ${jobId} does not exist.</div>
					`
					}
				}
			})
		}

	})

	return /*html*/ `
		<style>
			.patchJob .jobId {
				width: 2rem;
				margin-right: .3rem;
				text-align: right;
			}
		</style>
	 	<fieldset class="component patchJob">
			<legend>Patch Job</legend>
			<form>
				<div>Job ID: <input class="jobId" value="0"/></div>
				<div>Title: <input class="title"/><button>Change</button></div>
			</form>
			<div class="display"></div>
		</fieldset>
	`
}