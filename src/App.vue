<script>
import Header from "./components/Header.vue";
import Charactertable from "./components/CharacterTable.vue";
import router from "./router.js";

export default {
  name: "App",
  components: {
    Header,
    Charactertable,
  },
  data() {
    return {
      tokenInterval: null,
      showTable: true,
      createUsernameAndPasswordModal: false,
      username: "",
      password: "",
      search: "",
      filteredData: "",
      charNames: [],
      db: "",
      inventoryDb: "",
      eqDir: "",
      charInventory: "",
      filteredCharInventory: "",
      filteredCharSpellbook: "",
      itemSearchResults: "",
      missingSpells: "",
      filteredMissingSpells: "",
    };
  },
  methods: {
    async createUsernameAndPassword() {
      let body = {
        username: this.username,
        password: this.password,
      };
      try {
        const result = await fetch(
          "http://localhost:8000/createusernameandpassword",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        let returnedUsernameAndPassword = await result.json();
        console.log(returnedUsernameAndPassword);
      } catch (err) {
        console.log(err);
      }
    },
    // Deprecated
    async login() {
      let token = "";
      let body = {
        username: this.username,
        password: this.password,
      };
      try {
        const result = await fetch("http://localhost:8000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        let returnedPayload = await result.json();
        token = returnedPayload.token;
        console.log(token);
        localStorage.setItem("jwtToken", token);
        const storedToken = localStorage.getItem("jwtToken");

        if (storedToken) console.log("Token: ", storedToken);
        else console.log("Token not found.");
      } catch (err) {
        console.log(err);
      }
    },
    async isTokenValid(token) {
      try {
        const response = await fetch("http://localhost:8000/istokenvalid", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          console.log("Token is valid");
          return true;
        } else {
          console.log("Token is invalid");
          router.push("/login");
        }
      } catch (err) {
        console.log(err);
      }
    },
    // Check every 30 seconds for valid token:
    async isTokenValidInterval() {
      const storedToken = localStorage.getItem("jwtToken");
      this.tokenInterval = setInterval(async () => {
        if (storedToken) {
          let boolean = await this.isTokenValid(storedToken);
          console.log("interval test/debug");
          if (!boolean) router.push("/login");
        }
      }, 30000);
    },
    async getCharacters() {
      try {
        const result = await fetch("http://localhost:8000/getcharacters", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        let returnedDb = await result.json();
        // iterate over 'returnedDb' to populate out 'this.charNames' array, for usage for intentory parsing
        this.db = returnedDb;
        this.filteredData = this.db;
        returnedDb.forEach((char) => this.charNames.push(char.charName));
      } catch (err) {
        console.log(err);
      }
    },
    // Two functions wrapped into one:
    async getCharInventoryAndSpellbook(character) {
      this.getCharInventory(character);
      this.getCharSpellbook(character);
    },
    async getCharInventory(character) {
      let body = {
        charName: character.charName,
      };
      try {
        const result = await fetch("http://localhost:8000/getcharinventory", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        let returnedCharInventory = await result.json();
        console.log(
          "returnedCharInventory from getCharInventory() Appe.vue",
          returnedCharInventory
        );
        this.charInventory = returnedCharInventory;
        this.filteredCharInventory = returnedCharInventory;
      } catch (err) {
        console.log(err);
      }
    },
    async getCharSpellbook(character) {
      let body = {
        charName: character.charName,
      };
      try {
        const result = await fetch("http://localhost:8000/getcharspellbook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        let returnedCharSpellbook = await result.json();

        this.charSpellbook = returnedCharSpellbook;
        this.filteredCharSpellbook = returnedCharSpellbook;

        console.log("this.filteredCharSpellbook", this.filteredCharSpellbook);
      } catch (err) {
        console.log(err);
      }
    },
    async getMissingSpells(character) {
      let body = {
        charName: character.charName,
        charClass: character.charClass,
      };
      console.log(body);
      try {
        const result = await fetch("http://localhost:8000/getmissingspells", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        let returnedMissingSpells = await result.json();

        this.missingSpells = returnedMissingSpells;
        this.filteredMissingSpells = this.missingSpells;
        console.log(this.filteredMissingSpells);
      } catch (err) {
        console.log(err);
      }
    },
    characterSearch() {
      this.filteredData = this.db.filter((character) =>
        character.charName.toLowerCase().includes(this.search.toLowerCase())
      );
      console.log(this.filteredData);
    },
    resetFilteredData() {
      this.search = "";
      // this.filteredData = this.db;
      // console.log(this.filteredData)
      this.filteredData = this.db;
    },
    classSelect(data) {
      console.log(data);
      this.filteredData = this.db.filter((character) =>
        character.charClass.toLowerCase().includes(data.toLowerCase())
      );
    },
    // Could clean this up slightly on backend so I dont have to extract what I need from the returned obj. Just make the backend send only what I want.
    async getEqDir() {
      try {
        const result = await fetch("http://localhost:8000/geteqdir", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        let eqDir = await result.json();
        this.eqDir = eqDir.eqDir;
      } catch (err) {
        console.log(err);
      }
    },
    async eqDirUpdate(eqDir) {
      // Wasnt really sure the proper protocol here, but this looks fine to me:

      let body = { eqDir: eqDir };
      console.log("eqDir (appSide, test)", eqDir);
      console.log("body (appSide, test)", body);
      try {
        const result = await fetch("http://localhost:8000/eqdirupdate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        let returnedEqDir = await result.json();
        this.eqDir = returnedEqDir;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteCharacter(charName) {
      console.log("charName(parameter), App.vue:", charName);
      let characterIndex = this.filteredData.findIndex(
        (char) => char.charName === charName
      );
      this.filteredData.splice(characterIndex, 1);
      let body = { charName: charName };
      try {
        console.log(body);
        const result = await fetch("http://localhost:8000/deletecharacter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        console.log("Character Deleted!");
      } catch (err) {
        console.log(err);
      }
    },
    async addCharacter(data) {
      let body = {
        charName: data.charName,
        charClass: data.charClass,
        classID: data.classID,
        account: data.account,
        password: data.password,
        emuAccount: data.emuAccount,
        emuPassword: data.emuPassword,
        server: data.server,
        location: data.location,
      };
      this.filteredData.push(body);
      // ^^ possibly sort the array by charName eventually (polish phase)
      console.log("body", body);

      try {
        const result = await fetch("http://localhost:8000/addcharacter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        console.log("character added!");
      } catch (err) {
        console.log(err);
      }
    },
    async editCharacter(editedChar) {
      let body = editedChar;
      let index = this.db.findIndex((char) => char.charName === char.charName);
      // Remove the old object
      this.db.splice(index, 1);
      // Replace the removed old character object
      this.db.splice(index, 0, body);

      console.log("editedChar in App.vue", editedChar);

      // Send the new body to the expressAP
      try {
        const result = await fetch("http://localhost:8000/editcharacter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedChar),
        });
        console.log("character added!");
      } catch (err) {
        console.log(err);
      }
    },
    async rewriteCharInventory(charName) {
      let body = {
        charName: charName,
        eqDir: this.eqDir,
      };

      console.log(body);
      try {
        const result = await fetch(
          "http://localhost:8000/rewritecharinventory",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        let returnedCharInventory = await result.json();
        console.log(returnedCharInventory);
        this.charInventory = returnedCharInventory;
        // iterate over 'returnedDb' to populate out 'this.charNames' array, for usage for intentory parsing
      } catch (err) {
        console.log(err);
      }
    },
    searchCharInventory(charItemSearch) {
      this.filteredCharInventory = this.charInventory.filter((item) =>
        item.itemName.toLowerCase().includes(charItemSearch.toLowerCase())
      );
      if (charItemSearch === "")
        this.filteredCharInventory = this.charInventory;
    },
    searchCharSpellbook(charSpellSearch) {
      this.filteredCharSpellbook = this.charSpellbook.filter((spell) =>
        spell.spellName.toLowerCase().includes(charSpellSearch.toLowerCase())
      );
      if (charSpellSearch === "")
        this.filteredCharSpellbook = this.charSpellbook;
    },
    searchCharMissingSpells(charMissingSpellsSearch) {
      this.filteredMissingSpells = this.missingSpells.filter((spell) =>
        spell.spellName
          .toLowerCase()
          .includes(charMissingSpellsSearch.toLowerCase())
      );
      if (charMissingSpellsSearch === "")
        this.filteredMissingSpells = this.missingSpells;
    },
    async itemSearch(itemSearchInput) {
      let body = { itemSearchInput };

      try {
        const result = await fetch("http://localhost:8000/itemsearch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        this.itemSearchResults = await result.json();
        console.log(this.itemSearchResults);
      } catch (err) {
        console.log(err);
      }
    },
    async copyUi(character) {
      let body = {
        charName: character.charName,
        charClass: character.charClass,
        eqDir: this.eqDir,
      };

      try {
        const result = await fetch("http://localhost:8000/copyui", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } catch (err) {
        console.log(err);
      }
    },
    async createSpellsDb() {
      // Send a 'body' with all the 'charNames' (aka, this.charNames) and 'eqDir'
      let body = {
        charNames: this.charNames,
        eqDir: this.eqDir,
      };
      console.log("createSpellDb() TEST App.vue");
      try {
        const result = await fetch("http://localhost:8000/createspellsdb", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } catch (err) {
        console.log(err);
      }
    },
    async createInventoryDb() {
      // Send a 'body' with all the 'charNames' (aka, this.charNames) and 'eqDir'
      let body = {
        charNames: this.charNames,
        eqDir: this.eqDir,
      };

      try {
        const result = await fetch("http://localhost:8000/createinventorydb", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        // let returned = await result.json();
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getCharacters();
    this.getEqDir();
    this.isTokenValidInterval();
  },
  beforeDestroy() {
    clearInterval(this.isTokenValidInterval);
  },
};
</script>

<template>
  <div v-if="showTable">
    <Header
      @itemSearch="itemSearch"
      @classSelect="classSelect"
      @refreshTable="resetFilteredData"
      @addCharacter="addCharacter"
      @eqDirUpdate="eqDirUpdate"
      @createInventoryDb="createInventoryDb"
      @createSpellsDb="createSpellsDb"
      :eqDir="eqDir"
      :itemSearchResults="itemSearchResults"
    />
    <input
      @keyup="characterSearch"
      type="text"
      v-model="search"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
    />
    <Charactertable
      @searchCharMissingSpells="searchCharMissingSpells"
      @getMissingSpells="getMissingSpells"
      @searchCharSpellbook="searchCharSpellbook"
      @createSpellsDb="createSpellsDb"
      @copyUi="copyUi"
      @deleteCharacter="deleteCharacter"
      @editCharacter="editCharacter"
      @charInventoryModalOpen="getCharInventoryAndSpellbook"
      @rewriteCharInventory="rewriteCharInventory"
      @searchCharInventory="searchCharInventory"
      :filteredData="filteredData"
      :db="db"
      :charInventory="charInventory"
      :filteredCharInventory="filteredCharInventory"
      :filteredCharSpellbook="filteredCharSpellbook"
      :filteredMissingSpells="filteredMissingSpells"
    />
  </div>
</template>

<style scoped>
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  min-width: 50%;
  min-height: 75%;
  max-height: 90%;
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 10px 5px 2px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}
.class-select {
  margin: 1%;
}
</style>
