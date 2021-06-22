<template>
	<v-app>
		<Navigation></Navigation>
		<v-main id="content" ref="content">
			<v-container fluid ma-0 pa-0 fill-width>
				<router-view></router-view>
			</v-container>
		</v-main>
		<Footer></Footer>
	</v-app>
</template>

<style>
#content {
	background: "#E6E6FA";
}
</style>

<script>
import Navigation from "@/components/common/Navigation";
import Footer from "@/components/common/Footer";

export default {
	name: "app",
	components: {
		Navigation,
		Footer,
	},

	mounted() {
		window.addEventListener('beforeinstallprompt', (e) => 
		{     			
			console.log("Init install Banner");
			// Prevent Chrome 67 and earlier from automatically showing the prompt
			e.preventDefault();
			// Stash the event so it can be triggered later.
			self.deferredPrompt = e;  
		});
	},
	methods: {
      installApp()
      { 
        // Show the prompt
        this.deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        this.deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt');
            } else {
              console.log('User dismissed the A2HS prompt');
            }
            this.deferredPrompt = null;
          });
     
      },
	}
};
</script>