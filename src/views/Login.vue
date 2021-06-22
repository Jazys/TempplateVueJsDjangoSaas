<template>
	<v-container>
		<AlertBox />
		<v-layout class="align-center justify-center">
			<v-flex class="login pt-10">
				<center class="heading mb-3">
					<v-icon x-large>mdi-cloud-lock</v-icon>
					<h1>{{ $t('ViewLogin.headline') }}</h1>
				</center>
				<v-card class="pa-3">
					<ValidationObserver v-slot="{ handleSubmit, reset }">
						<v-form class="pa-3" @submit.prevent="handleSubmit(login)" @reset.prevent="reset">
							<ValidationProvider name="utilisateur" rules="required|min:3|max:20" v-slot="{ errors }">
								<v-text-field
									v-model="user.username"
									:error-messages="errors[0]"
									:label="$t('ViewLogin.username')"
									required
									prepend-icon="mdi-account"
									autocomplete="username"
								/>
							</ValidationProvider>

							<ValidationProvider name="mot de passe" rules="required|min:4|max:40" v-slot="{ errors }">
								<v-text-field
									v-model="user.password"
									:type="showPassword ? 'text' : 'password'"
									:error-messages="errors[0]"
									:label="$t('ViewLogin.password')"
									required
									prepend-icon="mdi-lock"
									autocomplete="current-password"
									:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
									@click:append="showPassword = !showPassword"
								/>
							</ValidationProvider>

							<div class="text-center ma-5">
								<router-link to="/password-reset">{{ $t('ViewLogin.forgot-password') }}</router-link>
							</div>

							<v-btn block type="submit">{{ $t('ViewLogin.connect') }}</v-btn>
						</v-form>
					</ValidationObserver>
				</v-card>

				<div class="ma-3 pa-3 text-center">
					<span class="ma-3">{{ $t('ViewLogin.no-account-yet') }}</span>
					<v-btn type="submit" to="/register">{{ $t('ViewLogin.create-account') }}</v-btn>
				</div>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import AlertBox from "@/components/AlertBox";
import User from "@/models/user";

export default {
	name: "ViewLogin",

	components: {
		AlertBox,
	},

	data() {
		return {
			user: new User("", "", ""),
			loading: true,
			passwordLost: false,
			showPassword: false,
		};
	},
	methods: {
		async login() {

			//On va sur la page d'accueil si on arrive à se logguer
			this.$store.dispatch("auth/token", this.user).then(
				() => {
					this.$router.push("/");
				},
				(error) => {
					this.loading = error;
					this.$bus.$emit("alert", {
						type: "error",
						text: "Nom d'utilisateur ou mot de passe érroné",
					});
				}
			);
		},

		async forgotPassword() {},
	},
};
</script>

<style lang="scss">
.login {
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