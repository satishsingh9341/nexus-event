# 🎪 Smart Event Management System
## Complete Project Specification Document
### (Developer / AI Prompt Ready — Build Karne Ke Liye)

---

## 📌 PROJECT OVERVIEW

**Project Name:** Smart Event Management System  
**Type:** Web-based (No mobile app — only website)  
**Purpose:** College/organization events ko smartly manage karna — QR entry, seat allocation, food distribution, credit score system, aur anonymous doubt system ke saath.  
**Language:** Hindi + English (Hinglish UI acceptable)  
**Platform:** Web only (Mobile responsive bhi hona chahiye)

---

## 🎯 CORE PHILOSOPHY

1. Sirf **registered students** ko entry milegi
2. Data **lifetime store** hoga — kabhi delete nahi hoga
3. System **offline bhi kaam karega** (LAN/WiFi hotspot pe)
4. **Cloud + Local** dono mein data rahega
5. **No mobile app** — sirf website
6. **Privacy first** — data encrypt hoga, third party ko nahi jayega

---

## 👥 USER ROLES & PERMISSIONS

### 1. Super Admin
- Poora system control karta hai
- Volunteer accounts create/delete kar sakta hai
- Admin accounts create kar sakta hai
- Kisi bhi data ko edit/delete kar sakta hai
- Credit score manually adjust kar sakta hai (reason ke saath)
- System settings change kar sakta hai
- Reports aur analytics dekh sakta hai

### 2. Admin (Head Organizer)
- Event create/manage kar sakta hai
- Registration link open/close kar sakta hai
- Food order count dekh aur manage kar sakta hai
- Seat allocation manage kar sakta hai
- Credit score dekh sakta hai
- Volunteer assign kar sakta hai
- Data cloud se fetch kar sakta hai
- Manual cloud upload kar sakta hai
- Seat change requests approve/reject kar sakta hai
- EHSAAS system moderate kar sakta hai

### 3. Volunteer
- Sirf READ access — kuch add/delete/edit NAHI kar sakta
- Student naam, attendance status dekh sakta hai
- QR scan karke attendance mark kar sakta hai
- Food distribution ke time QR scan kar sakta hai
- Credit score dekh sakta hai (sirf low/high — exact number nahi)
- Kisi ko manually add/remove NAHI kar sakta

### 4. Student (Registered User)
- Register kar sakta hai
- Apna QR code dekh sakta hai
- Apni seat dekh sakta hai
- Seat change request de sakta hai
- Food status dekh sakta hai
- Credit score dekh sakta hai (apna)
- EHSAAS mein sawaal pooch sakta hai
- Online events/workshops attend kar sakta hai
- Credit appeal kar sakta hai

---

## 📄 COMPLETE PAGE LIST

### STUDENT SIDE PAGES

#### 1. Registration Page
- Fields: Naam, Phone Number, Email, College ID (optional)
- Phone number se OTP verification
- Submit hone pe QR code generate ho jaata hai
- QR code WhatsApp pe bhi bheja jaayega (optional)
- Registration link admin close kar sakta hai — band hone pe "Registration closed" dikhega
- Registration event se 10-20 ghante pehle band hoti hai (admin set karega)

#### 2. Student Dashboard
- QR code bada dikhega (easy scanning ke liye)
- Zoom option hoga QR pe
- Apni seat number (after entry)
- Food status (eligible / collected / not eligible)
- Credit score meter
- Upcoming events list
- Notifications

#### 3. QR Code Page
- Full screen QR display
- Brightness automatically maximum ho jaaye
- Zoom in/out option
- "Save QR" button — download kar sako
- Backup 6-digit code bhi dikhega (agar QR scan na ho)

#### 4. Credit Score Page
- Current score display (meter/gauge style)
- Full history — kab badha, kab gira, kyun
- Appeal button — "Galat lag raha hai? Appeal karo"
- Online events list — "Score badhane ke liye ye attend karo"
- Rules clearly likhi hongi

#### 5. Seat Info Page
- Seat number prominently dikhega
- Hall map (simple grid) mein seat highlight hogi
- "Seat Change Request" button
- Request status (pending/approved/rejected)

#### 6. Food Status Page
- Current status: Eligible / Collected / Not Eligible
- Batch number aur estimated time
- Notification opt-in button
- History of past events food status

#### 7. EHSAAS — Doubt Page
- Anonymous mode toggle (ON/OFF)
- Mentor select karo (dropdown)
- Question type select karo (Technical / General / Personal / Other)
- Question likhne ka text box
- Submit button
- My questions tab — apne sawaalon ke jawab dekho
- Rate limit: Max 3 sawaal per hour
- Report button har sawaal pe

#### 8. Online Event/Workshop Page
- Upcoming online events list
- Join button
- During event: Quiz popup aayega random time pe
- 2 minute window to answer
- Quiz answer kiya = attendance valid
- Score update after event

---

### ORGANIZER/ADMIN SIDE PAGES

#### 1. Admin Login Page
- Email + Password
- 2FA (Two Factor Authentication) — OTP on phone
- "Remember this device" option

#### 2. Admin Dashboard (Main)
- Total registered students count
- Attendance today (live counter)
- Food distributed count
- Credit score alerts (kitne log low credit pe hain)
- Quick actions: Sync Data, Upload to Cloud, Lock Registration
- Recent activity log

#### 3. Event Management Page
- New event create karo
- Event details: Naam, Date, Time, Venue, Max capacity
- Registration link generate karo
- Registration band karne ka timer set karo (auto-close)
- Event status: Upcoming / Live / Completed

#### 4. Registration Management Page
- Poori registered students ki list
- Search bar — naam ya ID se dhundho
- Filter: Attended / Not attended / Low credit
- **"Fetch Latest Data"** button — portal se direct sync
- **"Upload to Cloud"** button — manual sync
- Auto-sync: Har 10 entries pe automatic cloud upload
- Export list option (admin ke liye)

#### 5. Attendance Marking Page
- QR scanner (camera se)
- Manual entry option — 6-digit backup code
- Student scan hone pe naam + photo dikhega (verification)
- Undo button — 30 second window
- Live attendance counter
- Suspicious activity flag (agar ek hi QR 2 baar scan ho)

#### 6. Seat Allocation Page
- Live seating map
- Har seat ka status: Empty / Occupied / Reserved / Accessible
- Seat categories:
  - General (Blue)
  - VIP/Speaker (Gold)
  - Specially Abled (Green)
  - Reserved/Hold (Grey)
- First In First Seat — automatic assign
- Group seating: Group code se adjacent seats
- Seat change requests list — Approve / Reject
- Hold seats: 30 min ke baad auto-release

#### 7. Food Management Page
- **Smart Food Count Calculator:**
  - Total registered: X
  - Low credit (2+ baar food nahi liya): -Y
  - **Recommended order: X - Y**
  - 10 buffer meals add karne ka option
- Batch management:
  - Batch size set karo (default: 10)
  - Notification bhejo batch ko
  - 15 min window timer
  - Batch status: Notified / In Progress / Done
- Food distribution:
  - QR scan karo — student verified
  - Status update: Eligible → Collected
  - Duplicate scan blocked
- End of event:
  - Surplus food count
  - NGO contact button (pre-configured)
  - Donation record

#### 8. Credit Score Management Page
- All students ki credit score list
- Filter: Low score / High score / At risk
- Manual adjustment option (Super Admin only) — reason required
- Credit rules configuration:
  - Attended event: +X points (configurable)
  - Online workshop: +X points
  - No-show: -X points
  - Late withdrawal timings aur penalties
- Appeals management:
  - Pending appeals list
  - Approve / Reject with reason
  - Student ko notification

#### 9. Volunteer Management Page
- Volunteer accounts create karo
- Assign to specific gate/area
- Volunteer activity log — kaun sa scan kab hua
- Suspicious activity alerts
- Remove volunteer access

#### 10. EHSAAS Moderation Page
- All questions list (anonymous aur named)
- Assign to mentor
- Block user option
- Rate limit override
- Report resolution

#### 11. Analytics Page
- Attendance trends
- Food wastage history
- Credit score distribution
- Event comparison
- Export reports (PDF/CSV)

---

## 🔄 OFFLINE SYSTEM — COMPLETE RULES

### How It Works:
1. Admin web panel mein "Fetch Data" dabao
2. Latest registered students data locally browser mein save ho jaata hai (IndexedDB)
3. Ab internet band kar do — system kaam karta rahega
4. Attendance mark karo — locally save hoti jaayegi
5. Har 10 entries pe — agar internet available hai — auto cloud upload
6. Manual "Upload Now" button bhi hoga
7. Agar device kharab ho gayi — dusra device lo, cloud se fresh fetch karo
8. Pending entries tab bhi dikhengi — kitna upload baki hai

### Sync Rules:
- **Auto sync:** Har 10 entries pe (agar internet ho)
- **Manual sync:** "Upload Now" button
- **Conflict resolution:** Cloud pe jo pehle aaya woh valid (timestamp based)
- **Partial sync protection:** Sync complete hone pe hi "Synced" dikhega
- **Offline indicator:** Screen pe clearly "OFFLINE MODE" badge dikhega

### Data Fetch Before Event:
- Event se 1 din pehle internet pe fetch kar lo
- Registration band hone ke baad ek final fetch karo
- Phir offline jaao — data complete hai

---

## ⭐ CREDIT SCORE SYSTEM — COMPLETE RULES

### Score Milega Kaise:

| Action | Credit Change |
|--------|--------------|
| Physical event attend kiya | +10 |
| Online workshop attend kiya (quiz pass) | +5 |
| Virtual event attend kiya (quiz pass) | +3 |
| 10+ ghante pehle withdrawal | 0 (No penalty) |
| 5-10 ghante mein withdrawal | -3 |
| 1-5 ghante mein withdrawal | -7 |
| Registered, aaya hi nahi (No show) | -10 |
| Food nahi liya (2 baar consecutive) | Soft restriction flag |
| Compensation coupon 2 baar unused | Next coupon disabled |

### Score Levels:
- 🟢 Good Standing: 70-100 — Sab events mein participate kar sakte ho
- 🟡 Warning: 40-69 — Participate kar sakte ho, warning milegi
- 🔴 Restricted: 0-39 — Naye events mein participate nahi kar sakte

### Score Recovery:
- Online workshops attend karo
- Virtual events attend karo
- Specific tasks complete karo (admin assign karega)
- Appeal karo agar genuinely problem thi

### Appeal Rules:
- Har user ko saal mein 2 free appeals
- Appeal reason select karo: Medical / Emergency / Technical issue / Other
- Admin 48 ghante mein decision lega
- Approved: Penalty cancel
- Rejected: Reason ke saath notification

### Online Event Verification:
- Random time pe quiz popup aayega
- Event content pe based questions
- 2 minute window to answer
- Questions randomize honge — har user ko alag
- 50%+ quizzes answer kiye = full credit
- 50% se kam = half credit
- Koi quiz nahi = no credit

---

## 🍱 FOOD SYSTEM — COMPLETE RULES

### Smart Food Count Formula:
```
Total Registered Students
MINUS Students with 2+ consecutive no-shows on food
MINUS Students with credit score in "Restricted" zone
= Base Food Count

Base Food Count + 10 buffer = FINAL ORDER
```

### Food Distribution Flow:
1. Admin batch size set karo (default 10)
2. System automatically batches banata hai
3. Batch ka time aaya → Notification students ko
4. Student aata hai → QR scan → Eligible check → Food milta hai
5. Status update: Eligible → Collected
6. 15 minute window — nahi aaya toh missed
7. Missed mark hoga — credit impact nahi (sirf record)
8. 2 consecutive events mein food nahi liya → Strike flag

### Compensation Rules:
- Food nahi mila (organizer ki galti) → Auto coupon generate
- Coupon value: Food price se 10-20% zyada
- Platform: Zomato / Swiggy (admin configure karega)
- Coupon 48 ghante mein expire
- 2 baar coupon unused → Next time coupon disabled
- Genuine reason → Admin reset kar sakta hai

### Food Waste Management:
- Event end → Surplus count system mein
- Pre-configured NGO contact ko automatic WhatsApp/SMS
- Donation record save hoga
- 10 buffer meals hamesha extra rakho

---

## 🪑 SEAT SYSTEM — COMPLETE RULES

### Allocation:
- First In First Seat — jo pehle aaya seat number 1, phir 2, 3...
- Seat number QR scan ke immediately baad assign hoga
- Student ke dashboard pe seat number dikhega

### Seat Categories:
- General seats: Auto-assign
- VIP seats: Admin manually assign karega
- Specially abled seats: Registration mein "Special Assistance" mark karo
- Group seats: Group code se adjacent seats

### Group Seating:
- Registration ke time "Group Code" enter karo (optional)
- Same group code wale saath register honge
- System unhe adjacent seats dega
- Group mein max 10 log

### Seat Change Request:
- Student dashboard pe "Request Seat Change" button
- Reason likhna optional
- System adjacent available seat dhundhega
- Gap create nahi hoga
- Admin approve karega
- Approved → New seat number student ko notify hoga

### Hold Seats:
- VIP/Speaker ke liye kuch seats "Hold" mein
- 30 min baad event start hone ke baad auto-release to general pool

---

## 🔐 SECURITY & PRIVACY RULES

### Data Storage:
- Sab data encrypted store hoga
- Student ka phone number internally hashed hoga
- No third party data sharing — kabhi nahi
- Student apna account delete kar sakta hai apni marzi se
- Data lifetime store rahega — kabhi auto-delete nahi

### Access Control:
- JWT Token based authentication
- Role-based permissions (Super Admin > Admin > Volunteer > Student)
- Volunteer sirf apne assigned gate ka data dekh sakta hai
- Admin sirf apne events ka data

### Volunteer Accountability:
- Har scan ka log: Volunteer ID + Timestamp + Student ID + Gate
- Unusually fast scans → Auto flag
- Admin ko alert
- Suspicious volunteer → Admin deactivate kar sakta hai

### Student Data Visible To:
- Student: Apna poora data
- Volunteer: Naam, attendance status, food status (credit score exact nahi)
- Admin: Sab kuch apne event ka
- Super Admin: Sab kuch

---

## 🛠️ TECH STACK RECOMMENDATION

| Layer | Technology | Reason |
|-------|-----------|--------|
| Frontend | React.js | Fast, component-based |
| Styling | Tailwind CSS | Quick beautiful UI |
| Backend | Node.js + Express | Fast API |
| Database | PostgreSQL | Reliable, relational |
| Cloud | Firebase / AWS | Auto-scaling |
| QR Generation | qrcode.js | Simple library |
| QR Scanning | html5-qrcode | Browser-based scanner |
| Offline Storage | IndexedDB | Local browser storage |
| Auth | JWT + OTP | Secure login |
| Real-time | Socket.io | Live attendance updates |
| Notifications | Firebase FCM | Push notifications |

---

## 🗄️ DATABASE SCHEMA (Simplified)

### Tables:

**users**
- id, name, phone, email, college_id, qr_code, credit_score, created_at, role

**events**
- id, name, date, time, venue, capacity, registration_open, registration_close_time, status

**registrations**
- id, user_id, event_id, registered_at, attended, seat_number, food_status, food_collected_at

**credit_history**
- id, user_id, event_id, change_amount, reason, timestamp

**food_batches**
- id, event_id, batch_number, batch_size, notified_at, window_close_at, status

**seat_change_requests**
- id, user_id, event_id, current_seat, requested_at, status, new_seat

**ehsaas_questions**
- id, user_id (nullable for anonymous), event_id, question, category, mentor_id, status, created_at

**volunteer_logs**
- id, volunteer_id, action, student_id, event_id, gate, timestamp

**appeals**
- id, user_id, credit_history_id, reason, status, admin_note, created_at, resolved_at

---

## 📱 UI/UX DESIGN REQUIREMENTS

### Overall Style:
- Clean, modern, professional
- Mobile-first (responsive)
- Dark mode support
- Color scheme: Deep purple/blue primary, green accents
- Large touch-friendly buttons
- Clear typography — readable on all screens

### Student Side:
- QR code must be large and scannable
- Maximum brightness hint when QR is open
- Seat number must be VERY prominent
- Credit score as visual meter/gauge
- Simple navigation — max 2 taps to anything

### Organizer Side:
- Dashboard must show key numbers at a glance
- Attendance counter must be real-time (live)
- Offline mode indicator always visible
- Sync status always visible
- Tables must be searchable and filterable
- Color coding: Green = good, Yellow = warning, Red = problem

### Special UI Elements:
- "OFFLINE MODE" red badge when internet is gone
- "Syncing..." animation when uploading
- "X entries pending upload" counter
- Food batch timer countdown
- Credit score color: Green/Yellow/Red based on level

---

## 🚨 EDGE CASES TO HANDLE

1. **Student QR not working** → 6-digit backup code fallback
2. **Volunteer device dead** → Another volunteer can take over
3. **Admin device dead** → Cloud se fresh data kisi bhi device pe fetch karo
4. **Event cancelled last minute** → No credit penalty for students, organizer rating drops
5. **Duplicate scan attempt** → Block + alert volunteer
6. **Food batch timeout** → Next batch starts, previous marked as missed
7. **Group member arrives late** → Adjacent seat may not be available — nearest available assigned
8. **Specially abled student** → Dedicated gate + pre-assigned accessible seat
9. **Internet returns during event** → All pending entries auto-upload
10. **Registration after cutoff** → "Registration closed" page with next event info

---

## 📋 DEVELOPMENT PHASES

### Phase 1 — Core (Build First)
- User registration + QR generation
- Admin login + event creation
- QR scan attendance marking
- Basic offline support
- Cloud sync

### Phase 2 — Smart Features
- Credit score system
- Food distribution + batch system
- Seat allocation + group seating
- Volunteer management

### Phase 3 — Advanced
- EHSAAS doubt system
- Online event + quiz verification
- Analytics dashboard
- Food compensation system
- NGO integration

### Phase 4 — Polish
- Push notifications
- Appeal system
- Advanced reporting
- Performance optimization
- Security audit

---

## 💬 SAMPLE PROMPTS FOR AI/VIBE CODING

### To build the full system, paste this:

> "Build a complete Smart Event Management web system with the following:
> 
> TECH STACK: React.js frontend, Node.js backend, PostgreSQL database, Firebase for cloud/auth, Tailwind CSS for styling.
>
> USER ROLES: Super Admin (full control), Admin (event management), Volunteer (read-only + scan), Student (self-service).
>
> KEY FEATURES:
> 1. Student registration with QR code generation — QR stored permanently, shown on dashboard
> 2. QR-based attendance marking — one-time scan, offline capable using IndexedDB
> 3. First-In-First-Seat allocation — auto assign on entry scan, group seating with group codes
> 4. Food distribution — batch-based (10 per batch), QR scan to collect, duplicate blocked
> 5. Smart food count = Total registered MINUS low-credit students (2+ food no-shows)
> 6. Credit score system — +10 attend, -10 no-show, with timered withdrawal penalties
> 7. Offline sync — data fetched before event, local save, auto-upload every 10 entries, manual upload button
> 8. EHSAAS anonymous doubt system — anonymous/named toggle, mentor assignment, rate limiting
> 9. Online event quiz verification — random quiz popup, 2 min window, attendance based on quiz completion
> 10. Admin dashboard with live counters, sync status, offline indicator
>
> RULES:
> - Registration closes 10-20 hours before event (admin sets timer)
> - Data stored forever, never auto-deleted
> - No third party data sharing
> - Volunteer cannot add/delete/edit — only view and scan
> - All scans logged with volunteer ID and timestamp
> - Seat change requests go through admin approval
>
> Build all pages listed, make it mobile responsive, use a clean dark theme with purple/blue colors."

---

*Document Version: 1.0*
*Last Updated: April 2026*
*Project: Smart Event Management System*
*Status: Ready for Development*
