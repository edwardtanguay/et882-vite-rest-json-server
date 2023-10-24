import { appData } from "../appContext";
import { IJob } from "../interface";

export const PutJob = () => {

	const { baseUrl } = appData;

	setTimeout(() => {
		const jobIdElem = document.querySelector<HTMLInputElement>('.putJob .jobId');
		const formElem = document.querySelector<HTMLInputElement>('.putJob form');
		const displayElem = document.querySelector<HTMLDivElement>('.putJob .display');

		if (jobIdElem && formElem && displayElem) {
			formElem.addEventListener('submit', async (e) => {
				e.preventDefault();
				const titleElem = document.querySelector<HTMLInputElement>('.putJob .title');
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
					}
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
			.putJob .job {
				margin-top: 1rem;
			}
		</style>
	 	<fieldset class="component putJob">
			<legend>Get Job</legend>
			<form>
				<div>Job ID: <input class="jobId" value="0"/></div>
				<div>Title: <input class="title"/><button>Search</button></div>
			</form>
			<div class="display"></div>
		</fieldset>
	`
}