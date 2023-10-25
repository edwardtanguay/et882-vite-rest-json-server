import { appData } from "../appContext";
import { IJob } from "../interface";

export const GetJob = () => {

	const { baseUrl } = appData;

	setTimeout(() => {
		const jobIdElem = document.querySelector<HTMLInputElement>('.getJob .jobId');
		const buttonElem = document.querySelector<HTMLInputElement>('.getJob button');
		const displayElem = document.querySelector<HTMLDivElement>('.getJob .display');

		if (jobIdElem && buttonElem && displayElem) {
			buttonElem.addEventListener('click', async (e) => {
				e.preventDefault();
				const jobId = jobIdElem.value;
				const response = await fetch(`${baseUrl}/jobs/${jobId}`);
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
						<div class="error">Job not found.</div>
					`
				}
			})
		}
	})

	return /*html*/ `
		<style>
			.getJob .jobId {
				width: 2rem;
				text-align: right;
			}
			.getJob .job {
				margin-top: 1rem;
			}
		</style>
	 	<fieldset class="component getJob">
			<legend>Get Job <span>(with fetch)</span></legend>
			<form>
			Job ID: <input class="jobId" value="0"/><button>Search</button>	
			</form>
			<div class="display"></div>
		</fieldset>
	`
}