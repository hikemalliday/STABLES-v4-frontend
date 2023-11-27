<script>
import router from "../router";

export default {
  name: "Header",
  props: ["eqDir", "itemSearchResults"],
  components: {},
  data() {
    return {
      showAlert: true,
      loginModal: false,
      classSelectModal: false,
      charCreateModal: false,
      eqDirModal: false,
      itemSearchModal: false,
      eqDirInputField: "",
      charName: "",
      charClass: "",
      classID: 0,
      emuAccount: "",
      emuPassword: "",
      account: "",
      password: "",
      server: "",
      location: "",
      itemSearchInput: "",
      isDropdownOpen: false,
      classOptions: [
        "Bard",
        "Cleric",
        "Druid",
        "Enchanter",
        "Mage",
        "Monk",
        "Necromancer",
        "Paladin",
        "Ranger",
        "Rogue",
        "Shadowknight",
        "Shaman",
        "Warrior",
        "Wizard",
      ],
    };
  },
  methods: {
    refreshtable() {
      this.$emit("refreshTable");
      console.log("test1");
    },
    classSelect(charClass) {
      this.$emit("classSelect", charClass);
    },
    filterClassOptions() {
      this.filteredClassOptions = this.classOptions.filter((option) =>
        option.toLowerCase().includes(this.charClass.toLowerCase())
      );
    },
    charCreateModalClose() {
      this.charCreateModal = false;
      this.charName = "";
      this.charClass = "";
      this.account = "";
      this.password = "";
      this.emuAccount = "";
      this.emuPassword = "";
      this.server = "";
      this.location = "";
    },

    eqDirModalClose() {
      this.eqDirModal = false;
    },
    async eqDirUpdate() {
      if (
        this.eqDirInputField[this.eqDirInputField.length - 1] !== "/" ||
        this.eqDirInputField[this.eqDirInputField.length - 1] !== "\\"
      )
        this.eqDirInputField = this.eqDirInputField + "/";
      this.$emit("eqDirUpdate", this.eqDirInputField);
    },
    async addCharacter() {
      switch (this.charClass) {
        case "Bard":
          this.classID = 1;
          break;
        case "Cleric":
          this.classID = 2;
          break;
        case "Druid":
          this.classID = 3;
          break;
        case "Enchanter":
          this.classID = 4;
          break;
        case "Mage":
          this.classID = 5;
          break;
        case "Monk":
          this.classID = 6;
          break;
        case "Necromancer":
          this.classID = 7;
          break;
        case "Paladin":
          this.classID = 8;
          break;
        case "Ranger":
          this.classID = 9;
          break;
        case "Rogue":
          this.classID = 10;
          break;
        case "Shadowknight":
          this.classID = 11;
          break;
        case "Shaman":
          this.classID = 12;
          break;
        case "Warrior":
          this.classID = 13;
          break;
        case "Wizard":
          this.classID = 14;
          break;
      }
      this.$emit("addCharacter", {
        charName: this.charName,
        charClass: this.charClass,
        classID: this.classID,
        emuAccount: this.emuAccount,
        emuPassword: this.emuPassword,
        account: this.account,
        password: this.password,
        server: this.server,
        location: this.location,
      });
    },
    async createInventoryDb() {
      this.$emit("createInventoryDb");
    },
    async createSpellsDb() {
      this.$emit("createSpellsDb");
    },
    async itemSearch() {
      if (this.itemSearchInput.length < 3) return;
      this.$emit("itemSearch", this.itemSearchInput);
    },
    async logOut() {
      localStorage.removeItem("jwtToken");
      router.push("/login");
    },
    checkInput() {
      this.showAlert = this.itemSearchInput.length < 3;
    },
  },
};
</script>

<template>
  <div class="flex justify-between whitespace-nowrap">
    <div class="flex flex-row">
      <div
        @click="refreshtable"
        class="text-2xl hover:text-sky-700 cursor-pointer active:text-sky-200"
      >
        S T A B L E S v4
      </div>
      <div class="mt-auto text-sm ml-2 mb-0.5 text-sky-700">
        CURRENT DIR: {{ eqDir }}
      </div>
    </div>

    <div class="flex items-end">
      <div
        @click="classSelectModal = true"
        class="px-1 font-medium focus:text-sky-400 active:text-sky-200 hover:text-sky-700 cursor-pointer"
      >
        CLASS
      </div>

      <div>|</div>

      <div
        @click="charCreateModal = true"
        class="px-1 font-medium focus:text-sky-400 active:text-sky-200 hover:text-sky-700 cursor-pointer"
      >
        NEW CHAR
      </div>

      <div>|</div>

      <div
        @click="itemSearchModal = true"
        class="px-1 font-medium focus:text-sky-400 active:text-sky-200 hover:text-sky-700 cursor-pointer"
      >
        ITEM SEARCH
      </div>

      <div>|</div>
      <div
        @click="eqDirModal = true"
        class="px-1 font-medium focus:text-sky-400 active:text-sky-200 hover:text-sky-700 cursor-pointer"
      >
        EQ DIR
      </div>

      <div>|</div>
      <div
        @click="
          createInventoryDb();
          createSpellsDb();
        "
        class="px-1 font-medium focus:text-sky-400 active:text-sky-200 hover:text-sky-700 cursor-pointer"
      >
        CREATE INVENTORY + SPELLS DB
      </div>

      <div>|</div>
    </div>
  </div>

  <!-- Class Select Modal -->

  <teleport to="body">
    <transition name="modal-class-select">
      <div
        class="modal-bg"
        v-if="classSelectModal"
        @mousedown="classSelectModal = false"
      >
        <div class="modal-class-select" @mousedown.stop>
          <div class="flex justify-between">
            <div
              @click="classSelect('Bard'), (classSelectModal = false)"
              class="class-select text-center w-32 rounded-lg cursor-pointer bg-color: bg-cyan-800 text-white focus:text-sky-400 active:text-sky-200 hover:text-sky-300"
            >
              Bard
            </div>
            <div
              @click="classSelect('Cleric'), (classSelectModal = false)"
              class="class-select text-center w-32 rounded-lg cursor-pointer bg-color: bg-cyan-800 text-white focus:text-sky-400 active:text-sky-200 hover:text-sky-300"
            >
              Cleric
            </div>
          </div>
          <div class="flex justify-between">
            <div
              @click="classSelect('Druid'), (classSelectModal = false)"
              class="class-select text-center w-32 rounded-lg cursor-pointer bg-color: bg-cyan-800 text-white focus:text-sky-400 active:text-sky-200 hover:text-sky-300"
            >
              Druid
            </div>
            <div
              @click="classSelect('Enchanter'), (classSelectModal = false)"
              class="class-select text-center w-32 rounded-lg cursor-pointer bg-color: bg-cyan-800 text-white focus:text-sky-400 active:text-sky-200 hover:text-sky-300"
            >
              Enchanter
            </div>
          </div>
          <div class="flex justify-between">
            <div
              @click="classSelect('Monk'), (classSelectModal = false)"
              class="class-select text-center w-32 rounded-lg cursor-pointer bg-color: bg-cyan-800 text-white focus:text-sky-400 active:text-sky-200 hover:text-sky-300"
            >
              Monk
            </div>
            <div
              @click="classSelect('Mage'), (classSelectModal = false)"
              class="class-select text-center w-32 rounded-lg cursor-pointer bg-color: bg-cyan-800 text-white focus:text-sky-400 active:text-sky-200 hover:text-sky-700"
            >
              Mage
            </div>
          </div>
          <div class="flex justify-between">
            <div
              @click="classSelect('Necromancer'), (classSelectModal = false)"
              class="class-select text-center w-32 rounded-lg cursor-pointer bg-color: bg-cyan-800 text-white focus:text-sky-400 active:text-sky-200 hover:text-sky-300"
            >
              Necromancer
            </div>
            <div
              @click="classSelect('Paladin'), (classSelectModal = false)"
              class="class-select text-center w-32 rounded-lg cursor-pointer bg-color: bg-cyan-800 text-white focus:text-sky-400 active:text-sky-200 hover:text-sky-300"
            >
              Paladin
            </div>
          </div>
          <div class="flex justify-between">
            <div
              @click="classSelect('Ranger'), (classSelectModal = false)"
              class="class-select text-center w-32 rounded-lg cursor-pointer bg-color: bg-cyan-800 text-white focus:text-sky-400 active:text-sky-200 hover:text-sky-300"
            >
              Ranger
            </div>
            <div
              @click="classSelect('Rogue'), (classSelectModal = false)"
              class="class-select text-center w-32 rounded-lg cursor-pointer bg-color: bg-cyan-800 text-white focus:text-sky-400 active:text-sky-200 hover:text-sky-300"
            >
              Rogue
            </div>
          </div>
          <div class="flex justify-between">
            <div
              @click="classSelect('Shadowknight'), (classSelectModal = false)"
              class="class-select text-center w-32 rounded-lg cursor-pointer bg-color: bg-cyan-800 text-white focus:text-sky-400 active:text-sky-200 hover:text-sky-300"
            >
              Shadowknight
            </div>
            <div
              @click="classSelect('Shaman'), (classSelectModal = false)"
              class="class-select text-center w-32 rounded-lg cursor-pointer bg-color: bg-cyan-800 text-white focus:text-sky-400 active:text-sky-200 hover:text-sky-300"
            >
              Shaman
            </div>
          </div>
          <div class="flex justify-between">
            <div
              @click="classSelect('Warrior'), (classSelectModal = false)"
              class="class-select text-center w-32 rounded-lg cursor-pointer bg-color: bg-cyan-800 text-white focus:text-sky-400 active:text-sky-200 hover:text-sky-300"
            >
              Warrior
            </div>
            <div
              @click="classSelect('Wizard'), (classSelectModal = false)"
              class="class-select text-center w-32 rounded-lg cursor-pointer bg-color: bg-cyan-800 text-white focus:text-sky-400 active:text-sky-200 hover:text-sky-300"
            >
              Wizard
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>

  <!-- Char Create Modal -->

  <teleport to="body">
    <transition name="modal">
      <div
        class="modal-bg"
        v-if="charCreateModal"
        @mousedown="charCreateModalClose"
      >
        <div class="modal" @mousedown.stop>
          <form
            @submit.prevent="
              addCharacter();
              charCreateModalClose();
            "
          >
            <div class="rounded-t-md mb-3 bg-cyan-900 text-white text-center">
              Enter New Character
            </div>
            <div>Name</div>
            <input
              v-model="charName"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
            />
            <div>Class</div>

            <div>
              <label for="dropdown"></label>
              <select
                required
                v-model="charClass"
                id="dropdown"
                class="py-2 px-4"
              >
                <option value="" disabled>Select Class</option>
                <option
                  v-for="option in classOptions"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
            </div>
            <div>Account</div>
            <input
              v-model="account"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
            />
            <div>Passowrd</div>
            <input
              v-model="password"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
            />
            <div>emuAccount</div>
            <input
              v-model="emuAccount"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
            />
            <div>emuPassword</div>
            <input
              v-model="emuPassword"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
            />
            <div>Server</div>
            <input
              v-model="server"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
            />
            <div>Location</div>
            <input
              v-model="location"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
            />
            <button
              type="submit"
              class="focus:text-sky-400 active:text-sky-200 hover:text-sky-700 cursor-pointer mt-1 bg-cyan-900 text-white text-center"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </transition>
  </teleport>

  <!-- Item Search Modal -->

  <teleport to="body">
    <transition name="modal">
      <div
        class="modal-bg"
        v-if="itemSearchModal"
        @mousedown="itemSearchModal = false"
      >
        <div class="modal" @mousedown.stop>
          <div
            class="text-2xl hover:text-sky-700 cursor-pointer active:text-sky-200"
          >
            Item Search {{ itemSearchInput }}
          </div>
          <div>
            <input
              @input="checkInput"
              @keyup.enter="itemSearch"
              v-model="itemSearchInput"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
            />
            <div class="alert container" v-if="showAlert">
              Please enter at least 3 characters.
            </div>
          </div>
          <div class="flex justify-center font-Poppins">
            <table class="w-full shadow-2xl border-cyan-200">
              <thead class="bg-cyan-900 text-white text-center">
                <tr>
                  <th
                    class="p-3 text-sm font-semibold tracking-wide text-center"
                  >
                    charName
                  </th>
                  <th
                    @click="sortItemSearch('itemName')"
                    class="p-3 text-sm font-semibold tracking-wide text-center focus:text-sky-400 active:text-sky-200 hover:text-sky-700 cursor-pointer"
                  >
                    itemName
                  </th>
                  <th
                    class="p-3 text-sm font-semibold tracking-wide text-center"
                  >
                    Location
                  </th>
                  <th
                    class="p-3 text-sm font-semibold tracking-wide text-center"
                  >
                    itemId
                  </th>
                  <th
                    class="p-3 text-sm font-semibold tracking-wide text-center"
                  >
                    itemCount
                  </th>
                </tr>
              </thead>
              <tbody class="text-cyan-900">
                <tr
                  :class="{
                    'bg-white text-center': index % 2 === 0,
                    'bg-slate-50 text-center': index % 2 !== 0,
                  }"
                  v-for="(item, index) in itemSearchResults"
                >
                  <td class="py-3">{{ item?.charName }}</td>
                  <td class="py-3">{{ item?.itemName }}</td>
                  <td class="py-3">{{ item?.location }}</td>
                  <td class="py-3">{{ item?.itemId }}</td>
                  <td class="py-3">{{ item?.itemCount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </transition>
  </teleport>

  <!-- EQ Dir Modal -->

  <teleport to="body">
    <transition name="modal">
      <div class="modal-bg" v-if="eqDirModal" @mousedown="eqDirModalClose">
        <div class="modal" @mousedown.stop>
          <div class="rounded-t-md mb-3 bg-cyan-900 text-white text-center">
            Enter EQ Dir
          </div>
          <input
            v-model="eqDirInputField"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
          />
          <div
            @click="
              eqDirUpdate();
              eqDirModalClose();
            "
            class="focus:text-sky-400 active:text-sky-200 hover:text-sky-700 cursor-pointer mt-1 bg-cyan-900 text-white text-center"
          >
            SUBMIT
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<!-- This could have been done in Tailwind im sure, but following a tutorial: -->
<style scoped>
.alert-container {
  display: none;
  margin-top: 5px;
  color: red;
}
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
  max-height: 90%;
  min-width: 27%;
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 10px 5px 2px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.modal-class-select {
  max-height: 90%;
  width: 300px;
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

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  position: absolute;
  width: 80%;
  background-color: white;
}

li {
  padding: 8px;
  cursor: pointer;
}
</style>
