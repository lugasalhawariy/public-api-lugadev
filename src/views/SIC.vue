<template>
  <Navbar></Navbar>
  <div class="sic container mt-4">
    <div class="row">
      <div class="col-12 col-md-8 col-lg-8">
          <div id="v-model-select" class="demo">
            <div class="row mb-4">
              <div class="col-6">
                <select v-model="negara" class="form-select">
                  <option :value="360">Indonesia</option>
                  <option :value="458">Malaysia</option>
                  <option :value="156">China</option>
                  <option :value="392">Jepang</option>
                  <option :value="764">Thailand</option>
                  <option :value="704">Viet Nam</option>
                  <option :value="699">India</option>
                </select>
              </div>
              <div class="col-6">
                <select v-model="pebanding" class="form-select">
                  <option :value="360">Indonesia</option>
                  <option :value="458">Malaysia</option>
                  <option :value="156">China</option>
                  <option :value="392">Jepang</option>
                  <option :value="764">Thailand</option>
                  <option :value="704">Viet Nam</option>
                  <option :value="699">India</option>
                </select>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-6">
                <div id="v-model-radiobutton">
                  <!-- radio 1 -->
                  <div class="form-check">
                    <input class="form-check-input" type="radio" id="beras" value="1006" v-model="komoditas" />
                    <label for="beras" class="form-check-label">Beras</label>
                  </div>
                  <!-- radio 2 -->
                  <div class="form-check">
                    <input class="form-check-input" type="radio" id="kelapaSawit" value="120710" v-model="komoditas" />
                    <label for="kelapaSawit" class="form-check-label">Kelapa Sawit</label>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div id="v-model-radiobutton">
                  <!-- radio 1 -->
                  <div class="form-check">
                    <input class="form-check-input" type="radio" id="karet" value="4001" v-model="komoditas" />
                    <label for="karet" class="form-check-label">Karet</label>
                  </div>
                  <!-- radio 2 -->
                  <div class="form-check">
                    <input class="form-check-input" type="radio" id="kelapa" value="151311" v-model="komoditas" />
                    <label for="kelapa" class="form-check-label">Kelapa</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-12">
                <input type="text" placeholder="Tahun - Jika lebih dari 1 berikan tanda , (koma)" v-model="tahun" class="form-control">
              </div>
            </div>
          </div>
        <div>
          <div v-if="this.loading == true" disable class="btn w-100 mb-4 btn-warning">
            Loading ...
          </div>
          <div v-else @click="getdata()" class="btn w-100 mb-4 btn-primary">
            Get Data
          </div>
        </div>
        <table class="table table-bordered">
          <thead class="thead">
            <tr>
              <th>RG Code</th>
              <th>Negara Asal</th>
              <th>Tipe Transaksi</th>
              <th>Negara Tujuan</th>
              <th>Jumlah (KG)</th>
              <th>Biaya</th>
              <th>Tahun</th>
            </tr>
          </thead>
          <tbody class="tbody" v-if="sic.length > 0">
            <tr v-for="data in sic" v-bind:key="data.yr">
              <td>{{ data.rgCode }}</td>
              <td>{{ data.rtTitle }}</td>
              <td>{{ data.rgDesc }}</td>
              <td>{{ data.ptTitle }}</td>
              <td>{{ data.NetWeight }}</td>
              <td>$ {{ data.TradeValue }}</td>
              <td>{{ data.yr }}</td>
            </tr>
          </tbody>
          <tbody class="tbody" v-else>
            <tr>
              <td colspan="7" class="text-center">Data tidak ada</td>
            </tr>
          </tbody>
        </table>
        <div v-if="this.banding == true">
          <div v-if="this.loading" class="btn w-100 mb-4 btn-warning">Loading . . . </div>
          <div v-else @click="getBanding()" class="btn w-100 mb-4 btn-success">Bandingkan Sekarang</div>
        </div>
        <table v-if="this.banding == true" class="table table-bordered">
          <thead class="thead">
            <tr>
              <th>RG Code</th>
              <th>Negara Asal</th>
              <th>Tipe Transaksi</th>
              <th>Negara Tujuan</th>
              <th>Jumlah (KG)</th>
              <th>Biaya</th>
              <th>Tahun</th>
            </tr>
          </thead>
          <tbody class="tbody" v-if="sicBanding.length > 0">
            <tr v-for="data in sicBanding" v-bind:key="data.yr">
              <td>{{ data.rgCode }}</td>
              <td>{{ data.rtTitle }}</td>
              <td>{{ data.rgDesc }}</td>
              <td>{{ data.ptTitle }}</td>
              <td>{{ data.NetWeight }}</td>
              <td>$ {{ data.TradeValue }}</td>
              <td>{{ data.yr }}</td>
            </tr>
          </tbody>
          <tbody class="tbody" v-else>
            <tr>
              <td colspan="7" class="text-center">Data tidak ada</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-12 col-md-4 col-lg-4">
        <!-- card text detail -->
        <div class="card">
          <div class="card-header">
            Detail Information
          </div>
          <div class="card-body px-2 pt-4">
            <h4 class="text-center">Negara Utama</h4>
            <hr>
            <div class="row mx-2">
              <div class="col-12">
                <div class="row d-flex justify-content-between">
                  <div class="col-6" style="font-weight: bold;">
                    Total Data
                  </div>
                  <div class="col-6" style="text-align: right;">
                    {{ sic.length }}
                  </div>
                </div>
                <div class="row d-flex justify-content-between">
                  <div class="col-6" style="font-weight: bold;">
                    Total Export
                  </div>
                  <div class="col-6" style="text-align: right;">
                    {{ this.export.length }}
                  </div>
                </div>
                <div class="row d-flex justify-content-between">
                  <div class="col-6" style="font-weight: bold;">
                    Total Import
                  </div>
                  <div class="col-6" style="text-align: right;">
                    {{ this.import.length }}
                  </div>
                </div>
                <div class="row d-flex justify-content-between">
                  <div class="col-6" style="font-weight: bold;">
                    Berat Eksport
                  </div>
                  <div class="col-6" style="text-align: right;">
                    {{ this.netWeightEksport }} Kg
                  </div>
                </div>
              </div>
            </div>
            <h4 class="text-center mt-4">Negara Pebanding</h4>
            <hr>
            <div class="row mx-2">
              <div class="col-12">
                <div class="row d-flex justify-content-between">
                  <div class="col-6" style="font-weight: bold;">
                    Total Data
                  </div>
                  <div class="col-6" style="text-align: right;">
                    {{ sicBanding.length }}
                  </div>
                </div>
                <div class="row d-flex justify-content-between">
                  <div class="col-6" style="font-weight: bold;">
                    Total Export
                  </div>
                  <div class="col-6" style="text-align: right;">
                    {{ this.exportBanding.length }}
                  </div>
                </div>
                <div class="row d-flex justify-content-between">
                  <div class="col-6" style="font-weight: bold;">
                    Total Import
                  </div>
                  <div class="col-6" style="text-align: right;">
                    {{ this.importBanding.length }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- card chart detail -->
        <div class="card mt-2">
          <div class="card-header">
            Chart Data
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12 mb-4">
                <h5>Tahun:</h5> 
                <p class="d-inline mx-2" v-for="row in this.ArrayTahun" :key="row">
                  {{ row }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import axios from 'axios'

export default {
  name: 'SIC',
  components: {
    Navbar,
  },
  data () {
    return {
      loading: false,
      sic: [],
      sicBanding: [],
      export: [],
      import: [],
      exportBanding: [],
      importBanding: [],
      tahun: null ,
      negara: null,
      pebanding: null,
      komoditas: null,
      banding: false,
      ArrayTahun: [],
      netWeightEksport: 0,
      netWeightImport: 0
    };
  },
  methods: {
    async getdata() {
      this.netWeightEksport = 0
      this.loading = true
      this.banding = false
      this.exportBanding = []
      this.importBanding = []
      this.sicBanding = []
      await axios.get(`https://comtrade.un.org/api/get`, {
        params: {
          ps: this.tahun,
          r: this.negara,
          px: 'HS',
          p: this.pebanding,
          cc: this.komoditas,
          max: 500,
          freq: 'A',
          rg: 'all',
          type: 'C'
        }
      }).then(res => {
        this.sic = res.data.dataset
        this.banding = true
        
        // HITUNG EXPORT
        this.export = res.data.dataset.filter(function (item) {
          return item.rgDesc.match("Export")
        })

        // HITUNG IMPORT
        this.import = res.data.dataset.filter(function (item) {
          return item.rgDesc.match("Import")
        })
        // HITUNG BERAT PER TAHUN
        this.spliteTahun()
        this.hitungKilo(this.export)
        this.hitungKilo(this.import)

        this.loading = false
        return this.sic.sort
        }).catch(err => console.log(err));
    },
    async getBanding() {
      this.loading = true
      await axios.get(`https://comtrade.un.org/api/get`, {
        params: {
          ps: this.tahun,
          r: this.pebanding,
          px: 'HS',
          p: this.negara,
          cc: this.komoditas,
          max: 500,
          freq: 'A',
          rg: 'all',
          type: 'C'
        }
      }).then(res => {
        this.sicBanding = res.data.dataset
        
        // HITUNG EXPORT
        this.exportBanding = res.data.dataset.filter(function (item) {
          return item.rgDesc.match("Export")
        })

        // HITUNG IMPORT
        this.importBanding = res.data.dataset.filter(function (item) {
          return item.rgDesc.match("Import")
        })
        
        this.loading = false
        return this.sic
        }).catch(err => console.log(err));
    },
    spliteTahun(){
      return this.ArrayTahun = this.tahun.split(',')
    },
    hitungKilo(data){
      return data.forEach(element => {
        this.netWeightEksport += parseInt(element.NetWeight);
      });
    }
  },
  mounted() {
  }
};
</script>
