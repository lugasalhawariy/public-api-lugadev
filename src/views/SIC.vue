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
                </select>
              </div>
              <div class="col-6">
                <select v-model="pebanding" class="form-select">
                  <option :value="360">Indonesia</option>
                  <option :value="458">Malaysia</option>
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
                    <input class="form-check-input" type="radio" id="kelapaSawit" value="10" v-model="komoditas" />
                    <label for="kelapaSawit" class="form-check-label">Kelapa Sawit</label>
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
          <div @click="getdata()" class="btn w-100 mb-4 btn-primary">get data</div>
        </div>
        <table class="table table-bordered">
          <thead class="thead">
            <tr>
              <th>RG Code</th>
              <th>Negara Asal</th>
              <th>Tipe Transaksi</th>
              <th>Negara Tujuan</th>
              <th>Tahun</th>
            </tr>
          </thead>
          <tbody class="tbody" v-if="sic.length > 0">
            <tr v-for="data in sic" v-bind:key="data.rgCode">
              <td>{{ data.rgCode }}</td>
              <td>{{ data.rtTitle }}</td>
              <td>{{ data.rgDesc }}</td>
              <td>{{ data.ptTitle }}</td>
              <td>{{ data.yr }}</td>
            </tr>
          </tbody>
          <tbody class="tbody" v-else>
            <tr>
              <td colspan="5" class="text-center">Data tidak ada</td>
            </tr>
          </tbody>
        </table>
        <div>
          <div @click="getBanding()" class="btn w-100 mb-4 btn-warning">Bandingkan Sekarang</div>
        </div>
        <table class="table table-bordered">
          <thead class="thead">
            <tr>
              <th>RG Code</th>
              <th>Negara Asal</th>
              <th>Tipe Transaksi</th>
              <th>Negara Tujuan</th>
              <th>Tahun</th>
            </tr>
          </thead>
          <tbody class="tbody" v-if="sicBanding.length > 0">
            <tr v-for="data in sicBanding" v-bind:key="data.rgCode">
              <td>{{ data.rgCode }}</td>
              <td>{{ data.rtTitle }}</td>
              <td>{{ data.rgDesc }}</td>
              <td>{{ data.ptTitle }}</td>
              <td>{{ data.yr }}</td>
            </tr>
          </tbody>
          <tbody class="tbody" v-else>
            <tr>
              <td colspan="5" class="text-center">Data tidak ada</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-12 col-md-4 col-lg-4">
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
    Navbar
  },
  data () {
    return {
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
    };
  },
  methods: {
    getdata() {
      this.sicBanding = []
      axios.get(`https://comtrade.un.org/api/get`, {
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
        
        // HITUNG EXPORT
        this.export = res.data.dataset.filter(function (item) {
          return item.rgDesc.match("Export")
        })

        // HITUNG IMPORT
        this.import = res.data.dataset.filter(function (item) {
          return item.rgDesc.match("Import")
        })
        
        return this.sic
        }).catch(err => console.log(err));
    },
    getBanding() {
      axios.get(`https://comtrade.un.org/api/get`, {
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
        
        return this.sic
        }).catch(err => console.log(err));
    }
  },
  mounted() {
  }
};
</script>
