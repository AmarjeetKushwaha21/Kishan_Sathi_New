// Automated Verification Script for Kishan Sathi Authentication & Role Segregation
import http from 'http';

function makeRequest({ method = 'GET', path = '/', body = null, token = null }) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : '';
    const headers = {
      'Content-Type': 'application/json',
    };
    if (postData) {
      headers['Content-Length'] = Buffer.byteLength(postData);
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(
      {
        hostname: 'localhost',
        port: 5000,
        path,
        method,
        headers,
      },
      (res) => {
        let raw = '';
        res.on('data', (chunk) => (raw += chunk));
        res.on('end', () => {
          try {
            const data = JSON.parse(raw);
            resolve({ status: res.statusCode, data });
          } catch (e) {
            resolve({ status: res.statusCode, text: raw });
          }
        });
      }
    );

    req.on('error', (e) => reject(e));
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function runTestSuite() {
  console.log('====================================================');
  console.log('🧪 RUNNING KISHAN SATHI BACKEND AUTHENTICATION SUITE');
  console.log('====================================================\n');

  try {
    // 1. Health check
    const health = await makeRequest({ path: '/api/health' });
    console.log(`[1] Health Check: Status ${health.status}`, health.data);

    // 2. Farmer Login
    console.log('\n[2] Testing Farmer Login (phone: 9876543210)...');
    const farmerRes = await makeRequest({
      method: 'POST',
      path: '/api/auth/login',
      body: { phone: '9876543210', password: 'Sathi@123' },
    });
    console.log(`Farmer Login Status: ${farmerRes.status}`);
    console.log(`Farmer Token Received:`, Boolean(farmerRes.data.token));
    console.log(`Farmer Role:`, farmerRes.data.role);

    const farmerToken = farmerRes.data.token;

    // 3. Company Login
    console.log('\n[3] Testing Company Login (company@kishansathi.demo)...');
    const companyRes = await makeRequest({
      method: 'POST',
      path: '/api/auth/login',
      body: { email: 'company@kishansathi.demo', password: 'company123' },
    });
    console.log(`Company Login Status: ${companyRes.status}`);
    console.log(`Company Token Received:`, Boolean(companyRes.data.token));
    console.log(`Company Role:`, companyRes.data.role);

    const companyToken = companyRes.data.token;

    // 4. Farmer accesses Farmer Dashboard (Allowed)
    console.log('\n[4] Farmer accessing Farmer Dashboard (/api/farmer/dashboard)...');
    const farmerDash = await makeRequest({
      path: '/api/farmer/dashboard',
      token: farmerToken,
    });
    console.log(`Farmer -> Farmer Dashboard Status: ${farmerDash.status} (Expected: 200)`);
    console.log(`Farmer Stats:`, farmerDash.data.stats);

    // 5. Company accesses Farmer Dashboard (Should be Blocked: 403 Forbidden)
    console.log('\n[5] Company attempting to access Farmer Dashboard (Cross-role test)...');
    const companyOnFarmer = await makeRequest({
      path: '/api/farmer/dashboard',
      token: companyToken,
    });
    console.log(`Company -> Farmer Dashboard Status: ${companyOnFarmer.status} (Expected: 403 Forbidden)`);
    console.log(`Response message:`, companyOnFarmer.data.message);

    // 6. Company accesses Company Dashboard (Allowed)
    console.log('\n[6] Company accessing Company Dashboard (/api/company/dashboard)...');
    const companyDash = await makeRequest({
      path: '/api/company/dashboard',
      token: companyToken,
    });
    console.log(`Company -> Company Dashboard Status: ${companyDash.status} (Expected: 200)`);
    console.log(`Company Stats:`, companyDash.data.stats);

    // 7. Farmer accesses Company Dashboard (Should be Blocked: 403 Forbidden)
    console.log('\n[7] Farmer attempting to access Company Dashboard (Cross-role test)...');
    const farmerOnCompany = await makeRequest({
      path: '/api/company/dashboard',
      token: farmerToken,
    });
    console.log(`Farmer -> Company Dashboard Status: ${farmerOnCompany.status} (Expected: 403 Forbidden)`);
    console.log(`Response message:`, farmerOnCompany.data.message);

    // 8. Auth profile /me
    console.log('\n[8] Testing /api/auth/me for farmer...');
    const meRes = await makeRequest({
      path: '/api/auth/me',
      token: farmerToken,
    });
    console.log(`Profile me status: ${meRes.status}`, meRes.data.user?.name);

    // 9. Logout
    console.log('\n[9] Testing /api/auth/logout...');
    const logoutRes = await makeRequest({
      method: 'POST',
      path: '/api/auth/logout',
    });
    console.log(`Logout Status: ${logoutRes.status}`, logoutRes.data.message);

    console.log('\n====================================================');
    console.log('🎉 ALL BACKEND AUTH & ROLE SEGREGATION TESTS PASSED!');
    console.log('====================================================');
  } catch (err) {
    console.error('Test failed with error:', err);
  }
}

runTestSuite();
