import { appData } from "../appContext";
import { IJob } from "../interface";

export const DeleteJob = () => {

	const { baseUrl } = appData;

	setTimeout(() => {
		const jobIdElem = document.querySelector<HTMLInputElement>('.deleteJob .jobId');
		const formElem = document.querySelector<HTMLInputElement>('.deleteJob form');
		const displayElem = document.querySelector<HTMLDivElement>('.deleteJob .display');

		if (jobIdElem && formElem && displayElem) {
			formElem.addEventListener('submit', async (e) => {
				e.preventDefault();
				const jobId = jobIdElem.value;

				const response = await fetch(`${baseUrl}/jobs/${jobId}`,
					{
						method: 'DELETE',
						headers: {
							'Access-Control-Allow-Origin': '*',
							'Content-Type': 'application/json'
						}
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
			})
		}

	})

	return /*html*/ `
		<style>
			.deleteJob .jobId {
				width: 2rem;
				margin-right: .3rem;
				text-align: right;
			}
		</style>
	 	<fieldset class="component deleteJob">
			<legend>Delete Job <span>(with fetch)</span></legend>
			<form>
				<div>Job ID: <input class="jobId" value="0"/><button>Delete</button></div>
			</form>
			<div class="display"></div>
		</fieldset>
	`
}