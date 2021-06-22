<template>
	<v-container>
		<AlertBox />
		<v-layout class="align-center justify-center">
			<v-flex class="register pt-10">
				<center class="heading mb-3">
					<v-icon x-large>mdi-cloud-lock</v-icon>
					<h1>{{ $t('ViewRegister.title') }}</h1>
				</center>
				<v-card class="pa-3">
					<ValidationObserver v-slot="{ handleSubmit  }">
						<v-form name="form" @submit.prevent="handleSubmit(handleRegister)">
							<div v-if="!successful">
								<ValidationProvider name="utilisateur" rules="required|min:3|max:20" v-slot="{ errors }">
									<v-text-field
										v-model="user.username"
										:error-messages="errors[0]"
										:label= "$t('ViewRegister.validate-user-label')"
										required
										prepend-icon="mdi-account"
									/>
								</ValidationProvider>

								<ValidationProvider name="email" rules="required|email|max:50" v-slot="{ errors }">
									<v-text-field
										v-model="user.email"
										:error-messages="errors[0]"
										:label= "$t('ViewRegister.validate-user-email')"
										required
										prepend-icon="mdi-mail"
									/>
								</ValidationProvider>

								<ValidationProvider name="mot de passe" rules="required|min:8|max:40" v-slot="{ errors }">
									<v-text-field
										v-model="user.password"
										:type="showPassword ? 'text' : 'password'"
										:error-messages="errors[0]"
										:label= "$t('ViewRegister.validate-user-password')"
										required
										prepend-icon="mdi-lock"
										:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
										@click:append="showPassword = !showPassword"
									/>
								</ValidationProvider>

								<v-checkbox v-model="checkbox_cgu">
									<template v-slot:label>
										<div>
											{{ $t('ViewRegister.validate-cgu') }}
											<a
												v-on:click="dialog_cgu=true"
												@click.stop
											>{{ $t('ViewRegister.cgu-ref') }}</a>
										</div>
									</template>
								</v-checkbox>

								<div>
									<v-btn block type="submit">{{ $t('ViewRegister.btn-register') }}</v-btn>
								</div>

								<v-dialog v-model="dialog_cgu" transition="fade-transition" class="mx-auto" width="100vh">
									<v-card>
										<v-card-title class="headline">{{ $t('ViewRegister.dialog-cgu') }}</v-card-title>
										<v-card-text></v-card-text>
										<v-card-actions>
											<v-spacer></v-spacer>
											<v-btn block text @click="dialog_cgu = false">{{ $t('ViewRegister.dialog-quit') }}</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>
							</div>
						</v-form>
					</ValidationObserver>
				</v-card>
			</v-flex>
		</v-layout>

		<v-alert outlined type="error" text dismissible v-if="message && !successful">{{message}}</v-alert>
	</v-container>
</template>

<script>
import AlertBox from "@/components/AlertBox";
import User from "@/models/user";

export default {
	name: "ViewRegister",

	components: {
		AlertBox,
	},

	data() {
		return {
			user: new User("", "", ""),
			submitted: false,
			successful: false,
			message: "",
			showPassword: false,
			checkbox_cgu: false,
			dialog_cgu: false,
		};
	},

	computed: {
		loggedIn() {
			return "";
		},
	},

	mounted() {
		if (this.loggedIn) {
			this.$router.push("/");
		}
	},
	methods: {
		//Permet d'enregistrer un utilisateur
		//Modifier la page si l'enregsitrement à marché
		handleRegister() {
			this.message = "";
			this.submitted = true;

			this.$store.dispatch("auth/register", this.user).then(
				(data) => {

					if (data.token) {
						localStorage.setItem("user", JSON.stringify(data));
					}

					this.message =
						this.$t('ViewRegister.alert-message');
					this.successful = true;

					//redirection vers la page de cartographie
					setTimeout(() => {
						this.$router.push("/");
					}, 5000);
				},
				(error) => {
					console.log(error.reponse);
					this.message =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString();
					this.successful = false;
				}
			);
		},
	},
};
</script>

<style lang="scss">
.register {
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