<script>
export default {
  name: "Charactertable",

  props: [
    "filteredData",
    "db",
    "charInventory",
    "filteredCharInventory",
    "filteredCharSpellbook",
    "filteredMissingSpells",
  ],
  components: {},
  data() {
    return {
      itemSearch: "",
      spellbookSearch: "",
      missingSpellsSearch: "",
      editCharModal: "",
      charInventoryModal: false,
      activeCharInventory: false,
      activeCharMissingSpells: false,
      charName: "",
      charClass: "",
      emuAccount: "",
      emuPassword: "",
      account: "",
      password: "",
      server: "",
      location: "",
      charNameMaster: "",
      activeChar: { activeCharClass: "", activeCharName: "" },
      selectedChar: {
        charName: "",
        charClass: "",
        classID: -1,
        account: "",
        password: "",
        emuAccount: "",
        emuPassword: "",
        server: "",
        location: "",
      },
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
    sortTable(column) {
      if (this[column]) {
        this.filteredData.sort((a, b) => {
          if (!a[column] || !b[column]) return;
          return b[column].toLowerCase().localeCompare(a[column]);
        });
      }

      if (!this[column]) {
        this.filteredData.sort((a, b) => {
          if (!a[column] || !b[column]) return;
          return a[column].toLowerCase().localeCompare(b[column]);
        });
      }

      this[column] = !this[column];
    },
    sortInventory(column) {
      if (this[column]) {
        this.filteredCharInventory.sort((a, b) => {
          if (!a[column] || !b[column]) return;
          return b[column].toLowerCase().localeCompare(a[column]);
        });
      }

      if (!this[column]) {
        this.filteredCharInventory.sort((a, b) => {
          if (!a[column] || !b[column]) return;
          return a[column].toLowerCase().localeCompare(b[column]);
        });
      }

      this[column] = !this[column];
    },
    sortCharSpellbook(column) {},
    sortCharMissingSpells(column) {
      if (this[column]) {
        this.filteredMissingSpells.sort((a, b) => {
          if (!a[column] || !b[column]) return;
          return b[column].toLowerCase().localeCompare(a[column]);
        });
      }

      if (!this[column]) {
        this.filteredMissingSpells.sort((a, b) => {
          if (!a[column] || !b[column]) return;
          return a[column].toLowerCase().localeCompare(b[column]);
        });
      }

      this[column] = !this[column];
    },
    searchCharInventory() {
      this.$emit("searchCharInventory", this.itemSearch);
    },
    searchCharSpellbook() {
      this.$emit("searchCharSpellbook", this.spellbookSearch);
    },
    searchCharMissingSpells() {
      this.$emit("searchCharMissingSpells", this.missingSpellsSearch);
    },
    deleteCharacter(charName) {
      this.$emit("deleteCharacter", charName);
    },

    editCharModalOpen(selectedChar1) {
      console.log(selectedChar1);
      this.selectedChar = selectedChar1;
      this.selectedChar.charNameMaster = this.selectedChar.charName;
      this.editCharModal = true;
    },

    editCharModalClose() {
      this.editCharModal = false;
      this.activeCharInventory = false;
      this.activeCharMissingSpells = false;
    },
    charInventoryModalOpen(charName, charClass) {
      this.activeChar.activeCharName = charName;
      this.activeChar.activeCharClass = charClass;
      let body = {
        charName: charName,
        charClass: charClass,
      };
      this.$emit("charInventoryModalOpen", body);

      this.charInventoryModal = true;
      this.activeCharInventory = true;

      console.log("console.log of this.activeChar", this.activeChar);
    },
    charInventoryModalClose() {
      this.charInventoryModal = false;
      this.activeCharSpellbook = false;
      this.activeCharMissingSpells = false;
    },
    editCharacter() {
      switch (this.selectedChar.charClass) {
        case "Bard":
          this.selectedChar.classID = 1;
          break;
        case "Cleric":
          this.selectedChar.classID = 2;
          break;
        case "Druid":
          this.selectedChar.classID = 3;
          break;
        case "Enchanter":
          this.selectedChar.classID = 4;
          break;
        case "Mage":
          this.selectedChar.classID = 5;
          break;
        case "Monk":
          this.selectedChar.classID = 6;
          break;
        case "Necromancer":
          this.selectedChar.classID = 7;
          break;
        case "Paladin":
          this.selectedChar.classID = 8;
          break;
        case "Ranger":
          this.selectedChar.classID = 9;
          break;
        case "Rogue":
          this.selectedChar.classID = 10;
          break;
        case "Shadowknight":
          this.selectedChar.classID = 11;
          break;
        case "Shaman":
          this.selectedChar.classID = 12;
          break;
        case "Warrior":
          this.selectedChar.classID = 13;
          break;
        case "Wizard":
          this.selectedChar.classID = 14;
          break;
      }
      console.log(this.selectedChar);
      this.$emit("editCharacter", this.selectedChar);
    },
    rewriteCharInventory(charName) {
      this.$emit("rewriteCharInventory", charName);
    },
    copyUi(charName, charClass) {
      let body = { charName, charClass };
      this.$emit("copyUi", body);
      console.log(body);
    },
    getMissingSpells(charName, charClass) {
      let body = { charName, charClass };

      console.log("body: getMissingSpells(characterTable.vue)", body);
      this.$emit("getMissingSpells", body);
    },
  },
  mounted() {},
};
</script>

<template>
  <div class="flex justify-center font-Poppins">
    <table class="w-full shadow-2xl border-cyan-200">
      <thead class="bg-cyan-900 text-white text-center">
        <tr>
          <th
            @click="sortTable('charName')"
            class="p-3 text-sm font-semibold tracking-wide text-center focus:text-sky-400 active:text-sky-200 hover:text-sky-700 cursor-pointer"
          >
            Name
          </th>
          <th
            @click="sortTable('charclass')"
            class="p-3 text-sm font-semibold tracking-wide text-center focus:text-sky-400 active:text-sky-200 hover:text-sky-700 cursor-pointer"
          >
            Class
          </th>
          <th class="p-3 text-sm font-semibold tracking-wide text-center">
            Account
          </th>
          <th class="p-3 text-sm font-semibold tracking-wide text-center">
            Password
          </th>
          <th class="p-3 text-sm font-semibold tracking-wide text-center">
            emuAccount
          </th>
          <th class="p-3 text-sm font-semibold tracking-wide text-center">
            emuPassword
          </th>
          <th
            @click="sortTable('server')"
            class="p-3 text-sm font-semibold tracking-wide text-center focus:text-sky-400 active:text-sky-200 hover:text-sky-700 cursor-pointer"
          >
            Server
          </th>
          <th
            @click="sortTable('location')"
            class="p-3 text-sm font-semibold tracking-wide text-center focus:text-sky-400 active:text-sky-200 hover:text-sky-700 cursor-pointer"
          >
            Location
          </th>
        </tr>
      </thead>

      <tbody class="text-cyan-900">
        <tr
          :class="{
            'bg-white text-center': index % 2 === 0,
            'bg-slate-50 text-center': index % 2 !== 0,
          }"
          v-for="(character, index) in filteredData"
        >
          <td class="flex justify-self-auto py-3 font-semibold">
            <div
              @click="
                charInventoryModalOpen(
                  character?.charName,
                  character?.charClass
                )
              "
              class="focus:text-sky-400 active:text-sky-200 hover:text-sky-700 cursor-pointer"
            >
              {{ character?.charName }}
            </div>
            <i
              @click="editCharModalOpen(filteredData[index])"
              class="fa-solid fa-pencil focus:text-sky-400 active:text-sky-200 hover:text-sky-700 cursor-pointer"
            ></i>
            <svg
              @click="deleteCharacter(character?.charName)"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 focus:text-sky-400 active:text-sky-200 hover:text-sky-700 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </td>
          <td class="py-3">{{ character?.charClass }}</td>
          <td class="py-3">{{ character?.account }}</td>
          <td class="py-3">{{ character?.password }}</td>
          <td class="py-3">{{ character?.emuAccount }}</td>
          <td class="py-3">{{ character?.emuPassword }}</td>
          <td class="py-3">{{ character?.server }}</td>
          <td class="py-3">{{ character?.location }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- EDIT Character Modal -->

  <teleport to="body">
    <transition name="modal">
      <div
        class="modal-bg"
        v-if="editCharModal"
        @mousedown="editCharModalClose"
      >
        <div class="modal" @mousedown.stop>
          <form
            @submit.prevent="
              editCharacter();
              editCharModalClose();
            "
          >
            <div class="rounded-t-md mb-3 bg-cyan-900 text-white text-center">
              Edit Character
            </div>
            <div>Name</div>
            <input
              v-model="selectedChar.charName"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
            />
            <div>Class</div>
            <div>
              <label for="dropdown"></label>
              <select
                required
                v-model="selectedChar.charClass"
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
              v-model="selectedChar.account"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
            />
            <div>Passowrd</div>
            <input
              v-model="selectedChar.password"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
            />
            <div>emuAccount</div>
            <input
              v-model="selectedChar.emuAccount"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
            />
            <div>emuPassword</div>
            <input
              v-model="selectedChar.emuPassword"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
            />
            <div>Server</div>
            <input
              v-model="selectedChar.server"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
            />
            <div>Location</div>
            <input
              v-model="selectedChar.location"
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

  <!-- Character Options + Inventory -->

  <teleport to="body">
    <transition name="modal">
      <div
        class="modal-bg"
        v-if="charInventoryModal"
        @mousedown="charInventoryModalClose"
      >
        <div class="modal" @mousedown.stop>
          <!-- INVENTORY -->
          <div v-if="activeCharInventory">
            <div class="space-x-20">
              <div class="flex flex-row">
                <!-- 'rewriteCharInvenrory()' && 'copyUI()' both pull their parameter data from filteredCharInventory, which is filled only if a successful Query happens on SQL, however if no inventory data is stored for that char, it cannot pull the parameters. Could create vars 'activeCharClass' and pull from there. When the modal is opened, we can fill this 'activeCharClass' obj -->
                <div
                  @click="
                    rewriteCharInventory(this.activeChar.activeCharName);
                    charInventoryModalOpen(
                      this.activeChar.activeCharName,
                      this.activeChar.activeCharClass
                    );
                  "
                  class="text-2xl hover:text-sky-700 cursor-pointer active:text-sky-200"
                >
                  GET INVENTORY
                </div>
                <div>|</div>
                <div
                  @click="
                    copyUi(
                      this.activeChar.activeCharName,
                      this.activeChar.activeCharClass
                    )
                  "
                  class="text-2xl hover:text-sky-700 cursor-pointer active:text-sky-200"
                >
                  COPY UI
                </div>
                <div>|</div>
                <div
                  @click="
                    activeCharSpellbook = true;
                    activeCharInventory = false;
                  "
                  class="text-2xl hover:text-sky-700 cursor-pointer active:text-sky-200"
                >
                  SPELLBOOK
                </div>
              </div>
            </div>

            <input
              @keyup="searchCharInventory"
              v-model="itemSearch"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
            />
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
                      @click="sortInventory('itemName')"
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
                    v-for="(item, index) in filteredCharInventory"
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

          <!-- SPELLBOOK -->

          <div v-if="activeCharSpellbook">
            <div class="space-x-20">
              <div class="flex flex-row">
                <!-- 'rewriteCharInvenrory()' && 'copyUI()' both pull their parameter data from filteredCharInventory, which is filled only if a successful Query happens on SQL, however if no inventory data is stored for that char, it cannot pull the parameters. Could create vars 'activeCharClass' and pull from there. When the modal is opened, we can fill this 'activeCharClass' obj -->
                <div
                  @click="
                    activeCharMissingSpells = true;
                    activeCharSpellbook = false;
                    getMissingSpells(
                      this.activeChar.activeCharName,
                      this.activeChar.activeCharClass
                    );
                  "
                  class="text-2xl hover:text-sky-700 cursor-pointer active:text-sky-200"
                >
                  MISSING SPELLS
                </div>
                <div>|</div>
                <div
                  @click="
                    activeCharSpellbook = false;
                    activeCharInventory = true;
                  "
                  class="text-2xl hover:text-sky-700 cursor-pointer active:text-sky-200"
                >
                  BACK
                </div>
              </div>
            </div>

            <input
              @keyup="searchCharSpellbook"
              v-model="spellbookSearch"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
            />
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
                      class="p-3 text-sm font-semibold tracking-wide text-center"
                    >
                      spellName
                    </th>
                    <th
                      class="p-3 text-sm font-semibold tracking-wide text-center"
                    >
                      Level
                    </th>
                  </tr>
                </thead>
                <tbody class="text-cyan-900">
                  <tr
                    :class="{
                      'bg-white text-center': index % 2 === 0,
                      'bg-slate-50 text-center': index % 2 !== 0,
                    }"
                    v-for="(spell, index) in filteredCharSpellbook"
                  >
                    <td class="py-3">{{ spell?.charName }}</td>
                    <td class="py-3">{{ spell?.spellName }}</td>
                    <td class="py-3">{{ spell?.spellLevel }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!--MISSING SPELLS-->
          <div v-if="activeCharMissingSpells">
            <div class="space-x-20">
              <div class="flex flex-row">
                <!-- 'rewriteCharInvenrory()' && 'copyUI()' both pull their parameter data from filteredCharInventory, which is filled only if a successful Query happens on SQL, however if no inventory data is stored for that char, it cannot pull the parameters. Could create vars 'activeCharClass' and pull from there. When the modal is opened, we can fill this 'activeCharClass' obj -->

                <div
                  @click="
                    activeCharSpellbook = true;
                    activeCharMissingSpells = false;
                  "
                  class="text-2xl hover:text-sky-700 cursor-pointer active:text-sky-200"
                >
                  BACK
                </div>
              </div>
            </div>

            <input
              @keyup="searchCharMissingSpells"
              v-model="missingSpellsSearch"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
            />
            <div class="flex justify-center font-Poppins">
              <table class="w-full shadow-2xl border-cyan-200">
                <thead class="bg-cyan-900 text-white text-center">
                  <tr>
                    <th
                      @click="sortCharMissingSpells('spellName')"
                      class="p-3 text-sm font-semibold tracking-wide text-center focus:text-sky-400 active:text-sky-200 hover:text-sky-700 cursor-pointer"
                    >
                      spellName
                    </th>
                    <th
                      @click="sortCharMissingSpells('spellLevel')"
                      class="p-3 text-sm font-semibold tracking-wide text-center focus:text-sky-400 active:text-sky-200 hover:text-sky-700 cursor-pointer"
                    >
                      Level
                    </th>
                  </tr>
                </thead>
                <tbody class="text-cyan-900">
                  <tr
                    :class="{
                      'bg-white text-center': index % 2 === 0,
                      'bg-slate-50 text-center': index % 2 !== 0,
                    }"
                    v-for="(spell, index) in filteredMissingSpells"
                  >
                    <td class="py-3">{{ spell?.spellName }}</td>
                    <td class="py-3">{{ spell?.spellLevel }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
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
