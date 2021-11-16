<script>
	let url = ''
	let loader = false;
	let onload = true;
	let issues = [];
	let insights = [];
	let errorText = '';
	const submitUrl = async (e)=>{
		loader = true
		if(url){
			let response = await fetch(`/api/issues?url=${url}`)
			let seoResponse = await fetch(`/api/insight?url=${url}`)
			if (response.status === 200 && seoResponse.status === 200) {
				const data = await response.json()
				const seoData = await seoResponse.json()
				issues = data.issues;
				insights = seoData.lighthouseResult.audits;
				console.log(insights.length)
				if (issues.length > 0) {
					loader = false
					errorText = "Congrats!!! No issue found."
				}
				onload = false

			} else{
				issues = []
				insights =[]
				loader = false
				onload = false
				const err = await response.json();
				errorText = err.error;
			}
		} else {
			issues = []
			insights = []
			loader = false
			onload = false
			errorText = "URL Required!";
		}
	}

</script>


<svelte:head>
	<title>Website Insights</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
	<!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
	<link rel="stylesheet" href="https://bootswatch.com/5/lux/bootstrap.min.css">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</svelte:head>

<section class="section">
	<div class="container">
		<div class="row py-5">
			<div class="col-12 col-md-12 col-sm-12">
				<div class="card card-body bg-dark text-light">
					<form id="form">
						<div class="form-group">
							<div class="input-group mb-2">
								<input type="url" name="url" id="url" class="form-control" placeholder="Enter your website url" bind:value={url}>
								<button class="btn btn-primary" on:click|preventDefault="{submitUrl}">Submit</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>

		
		{#if loader === true}
		<div class="d-flex flex-row justify-content-center align-center">
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
		{/if}
		{#if loader === false && issues.length > 0}
		<div class="row py-5">
			<div class="col-12 col-md-12 col-sm-12">
				<ul class="nav nav-tabs" id="myTab" role="tablist">
					<li class="nav-item" role="presentation">
					  <button class="nav-link active" id="access-tab" data-bs-toggle="tab" data-bs-target="#access" type="button" role="tab" aria-controls="access" aria-selected="true">Accessibility</button>
					</li>
					<li class="nav-item" role="presentation">
					  <button class="nav-link" id="seo-tab" data-bs-toggle="tab" data-bs-target="#seo" type="button" role="tab" aria-controls="seo" aria-selected="false">SEO</button>
					</li>
				  </ul>
				  <div class="tab-content" id="myTabContent">
					<div class="tab-pane fade show active" id="access" role="tabpanel" aria-labelledby="access-tab">
						{#each insights as insight, key}
							{insight[key]}
							{#if insight.score == 0 || insight.score == null}
								<div class="card mb-3 shadow-sm">
									<div class="card-body">
										<h4>{insight.title}</h4>
										<p class="bg-light p-3 my-3">
											{insight.description.split('. ')[0]}
										</p>
									</div>
								</div>
							{/if}
						{/each}
						{#each issues as issue}
						<div class="card mb-3 shadow-sm">
							<div class="card-body">
								<h4>{issue.message}</h4>
								<p class="bg-light p-3 my-3">
									{issue.context}
								</p>
								<p class="bg-primary text-light p-2">
									CODE: {issue.code}
								</p>
							</div>
						</div>
						{/each}
					</div>
					<div class="tab-pane fade" id="seo" role="tabpanel" aria-labelledby="seo-tab">
						{#each insights as insight, key}
							{{key}}
							{#if insight.score == 0 || insight.score == null}
								<div class="card mb-3 shadow-sm">
									<div class="card-body">
										<h4>{insight.title}</h4>
										<p class="bg-light p-3 my-3">
											{insight.description.split('. ')[0]}
										</p>
									</div>
								</div>
							{/if}
						{/each}
					</div>
				  </div>
			</div>
		</div>
		{:else if loader === false && issues.length === 0 && onload === false}
			<div class="row">
				<div class="col-12 col-md-12 col-sm-12 text-center">
					<h3 class="text-danger">{errorText}</h3>
				</div>
			</div>
		{/if}
	</div>
</section>

