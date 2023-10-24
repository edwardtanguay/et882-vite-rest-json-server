import { appData } from "../appContext";
import { IJob } from "../interface";

export const SearchJob = () => {

	const { baseUrl } = appData;

	setTimeout(() => {
		const jobIdElem = document.querySelector<HTMLInputElement>('.searchJob .jobId');
		const buttonElem = document.querySelector<HTMLInputElement>('.searchJob button');
		const displayElem = document.querySelector<HTMLDivElement>('.searchJob .display');
		
		if (jobIdElem && buttonElem && displayElem) {
			buttonElem.addEventListener('click', async (e) => {
				e.preventDefault();
				const jobId = jobIdElem.value;
				const response = await fetch(`${baseUrl}/jobs/${jobId}`);
				const job:IJob = await response.json();
				if (response.status === 200) {
					displayElem.innerHTML = `
						<div class="job">
							<div>${job.title} (${job.company})</div>	
							<div>${job.skillList}</div>	
						</div>
					`
				}
			})
		}

	})

	return /*html*/ `
		<style>
			.searchJob .jobId {
				width: 2rem;
				margin-right: .3rem;
				text-align: right;
			}
			.searchJob .job {
				margin-top: 1rem;
			}
		</style>
	 	<fieldset class="component searchJob">
			<legend>Search for individual job</legend>
			<form>
			Job ID: <input class="jobId" value="0"/><button>Search</button>	
			</form>
			<div class="display"></div>
		</fieldset>
	`
}