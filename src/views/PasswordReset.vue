<template>
	<v-container>
		<AlertBox />
		<v-layout class="align-center justify-center">
			<v-flex class="password-reset pt-10">
				<center class="heading mb-3">
					<v-icon x-large>mdi-cloud-lock</v-icon>
					<h1>{{ $t('ViewPasswordReset.headline') }}</h1>
				</center>
				<v-card class="pa-3">
					<ValidationObserver v-slot="{ handleSubmit, reset }">
						<form @submit.prevent="handleSubmit(forgotPassword)" @reset.prevent="reset">
							<ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
								<v-text-field
									v-model="email"
									:error-messages="errors[0]"
									:label="$t('ViewPasswordReset.email')"
									required
									prepend-icon="mdi-mail"
								/>
							</ValidationProvider>
							<div>
								<v-btn block type="submit">{{ $t('ViewPasswordReset.submit') }}</v-btn>
							</div>
						</form>
					</ValidationObserver>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import AlertBox from "@/components/AlertBox";

export default {
	name: "ViewPaswwordReset",

	components: {
		AlertBox,
	},

	data() {
		return {
			email: "",
		};
	},
	methods: {
		async forgotPassword() {},
	},
};
</script>

<style lang="scss">
.password-reset {
	max-width: 500px;
	a {
		color: var(--v-primary-base);
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
}
</style>