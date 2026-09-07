# Requirements Document - Phân Tích Sơ Đồ Tuần Tự MedLink Band

## Introduction

Tài liệu này mô tả các yêu cầu cho việc tạo tài liệu phân tích sơ đồ tuần tự (sequence diagram documentation) của hệ thống MedLink Band. Tài liệu phân tích sẽ mô tả chi tiết các luồng tương tác giữa Actor, UI Component, Service/Storage, và Data layer cho tất cả các use case chính của ứng dụng, bao gồm cả các luồng ngoại lệ (error cases, locked bracelet, invalid credentials).

Mục tiêu là tạo ra một tài liệu Markdown thuần túy, dễ đọc (human-readable), giúp developer, QA, và các stakeholders hiểu rõ luồng xử lý của hệ thống mà không cần công cụ vẽ đồ họa đặc biệt.

## Glossary

- **Hệ_Thống_Phân_Tích**: Hệ thống tạo và quản lý tài liệu phân tích sơ đồ tuần tự
- **Tài_Liệu_Sơ_Đồ**: Tài liệu Markdown chứa mô tả chi tiết các sequence diagram
- **Luồng_Chính**: Luồng xử lý thành công (happy path) của một use case
- **Luồng_Ngoại_Lệ**: Luồng xử lý khi có lỗi, ngoại lệ, hoặc điều kiện đặc biệt xảy ra
- **Actor**: Người dùng hoặc hệ thống bên ngoài tương tác với ứng dụng (Admin, Bác sĩ, Người cấp cứu, Browser)
- **UI_Component**: Các thành phần giao diện người dùng (Login.jsx, PatientManagement.jsx, EmergencyInfo.jsx, DoctorAuth.jsx, QRCodeCard.jsx)
- **Service_Layer**: Lớp xử lý logic nghiệp vụ và tương tác với storage (AuthContext, mockData.js, localStorage)
- **Storage**: Nơi lưu trữ dữ liệu (localStorage, sessionStorage trong MVP; Firebase trong tương lai)
- **Layer**: Một tầng trong kiến trúc hệ thống (Actor → UI → Service → Storage → Data)
- **Bước_Tương_Tác**: Một bước mô tả trong sequence diagram, bao gồm actor gọi action và response
- **Use_Case**: Một tình huống sử dụng cụ thể của hệ thống (Login, Quản lý bệnh nhân, Xem thông tin cấp cứu, Xác thực bác sĩ, Tạo QR code)
- **Định_Dạng_Markdown**: Chuẩn văn bản thuần túy sử dụng cú pháp Markdown để format tài liệu
- **MedLink_Band**: Hệ thống thông tin cấp cứu y tế qua vòng tay QR/NFC
- **Người_Dùng**: Người sử dụng hệ thống, bao gồm Admin, Bác sĩ, Người cấp cứu

## Requirements

### Requirement 1: Cấu trúc tổng thể của tài liệu phân tích

**User Story:** As a developer, I want tài liệu phân tích có cấu trúc rõ ràng và nhất quán, so that tôi có thể dễ dàng tìm kiếm và đọc hiểu các luồng xử lý.

#### Acceptance Criteria

1. THE Hệ_Thống_Phân_Tích SHALL tạo Tài_Liệu_Sơ_Đồ với header chính là tên tài liệu "Phân Tích Sơ Đồ Tuần Tự - MedLink Band"

2. THE Hệ_Thống_Phân_Tích SHALL bao gồm phần "Giới thiệu" mô tả mục đích và phạm vi của tài liệu

3. THE Hệ_Thống_Phân_Tích SHALL bao gồm phần "Danh sách Use Cases" liệt kê tất cả các use case được phân tích

4. THE Hệ_Thống_Phân_Tích SHALL tổ chức mỗi use case thành một section riêng biệt với header level 2

5. THE Hệ_Thống_Phân_Tích SHALL sử dụng ngôn ngữ Tiếng Việt cho toàn bộ nội dung tài liệu

6. THE Hệ_Thống_Phân_Tích SHALL tạo mục lục (Table of Contents) với links đến các section chính

### Requirement 2: Mô tả use case Login

**User Story:** As a developer, I want tài liệu mô tả chi tiết luồng đăng nhập, so that tôi hiểu rõ cách hệ thống xác thực admin và xử lý các trường hợp lỗi.

#### Acceptance Criteria

1. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính của use case Login với các bước từ Actor (Admin) đến UI_Component (Login.jsx), Service_Layer (AuthContext), và Storage (sessionStorage)

2. THE Hệ_Thống_Phân_Tích SHALL bao gồm Luồng_Ngoại_Lệ cho trường hợp nhập sai email hoặc password

3. THE Hệ_Thống_Phân_Tích SHALL bao gồm Luồng_Ngoại_Lệ cho trường hợp để trống email hoặc password

4. THE Hệ_Thống_Phân_Tích SHALL bao gồm Luồng_Ngoại_Lệ cho trường hợp user đã đăng nhập trước đó

5. THE Hệ_Thống_Phân_Tích SHALL mô tả response từ mỗi layer trở về Actor cho từng bước tương tác

6. THE Hệ_Thống_Phán_Tích SHALL liệt kê các thành phần tham gia: Admin (Actor), Login.jsx (UI), AuthContext (Service), sessionStorage (Storage)

### Requirement 3: Mô tả use case Quản lý bệnh nhân

**User Story:** As a developer, I want tài liệu mô tả chi tiết các luồng CRUD bệnh nhân, so that tôi hiểu rõ cách dữ liệu được tạo, đọc, cập nhật và xóa trong hệ thống.

#### Acceptance Criteria

1. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác tải danh sách bệnh nhân từ localStorage

2. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác tìm kiếm và lọc bệnh nhân theo từ khóa, nhóm máu, và trạng thái

3. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác thêm mới bệnh nhân với đầy đủ thông tin

4. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác chỉnh sửa thông tin bệnh nhân hiện có

5. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác xóa bệnh nhân với xác nhận

6. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác khóa hoặc mở khóa vòng tay bệnh nhân

7. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác export danh sách bệnh nhân sang CSV

8. THE Hệ_Thống_Phân_Tích SHALL bao gồm Luồng_Ngoại_Lệ cho trường hợp localStorage trống hoặc không có data

9. THE Hệ_Thống_Phân_Tích SHALL bao gồm Luồng_Ngoại_Lệ cho trường hợp validation thất bại khi thêm hoặc sửa bệnh nhân

10. THE Hệ_Thống_Phân_Tích SHALL bao gồm Luồng_Ngoại_Lệ cho trường hợp user hủy xác nhận xóa bệnh nhân

11. THE Hệ_Thống_Phân_Tích SHALL liệt kê các thành phần tham gia: Admin (Actor), PatientManagement.jsx (UI), PatientForm.jsx (UI), mockData.js (Service), localStorage (Storage)

### Requirement 4: Mô tả use case Tạo và tải QR code

**User Story:** As a developer, I want tài liệu mô tả chi tiết luồng tạo và tải QR code, so that tôi hiểu rõ cách hệ thống tạo QR từ thông tin bệnh nhân và convert sang PNG.

#### Acceptance Criteria

1. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác mở modal QR code từ danh sách bệnh nhân

2. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác render QR code SVG với URL emergency page

3. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác sao chép URL emergency page vào clipboard

4. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác tải QR code dưới dạng PNG với header và footer thông tin bệnh nhân

5. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác xem trước trang emergency của bệnh nhân trong tab mới

6. THE Hệ_Thống_Phân_Tích SHALL bao gồm Luồng_Ngoại_Lệ cho trường hợp browser không hỗ trợ clipboard API

7. THE Hệ_Thống_Phân_Tích SHALL bao gồm Luồng_Ngoại_Lệ cho trường hợp canvas rendering thất bại

8. THE Hệ_Thống_Phân_Tích SHALL liệt kê các thành phần tham gia: Admin (Actor), QRCodeCard.jsx (UI), qrcode.react (Library), Browser Canvas API (Service)

### Requirement 5: Mô tả use case Xem thông tin cấp cứu công khai

**User Story:** As a developer, I want tài liệu mô tả chi tiết luồng xem thông tin cấp cứu, so that tôi hiểu rõ cách người cấp cứu truy cập thông tin bệnh nhân qua QR/NFC.

#### Acceptance Criteria

1. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác quét QR hoặc NFC và truy cập URL emergency page

2. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác tải thông tin bệnh nhân từ localStorage theo patientId

3. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác hiển thị thông tin nhận dạng (tên, tuổi, giới tính)

4. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác hiển thị thông tin y tế quan trọng (nhóm máu, dị ứng, bệnh nền, chỉ định đặc biệt)

5. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác gọi điện thoại khẩn cấp cho người thân và bác sĩ

6. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác chuyển sang trang xác thực bác sĩ để xem bệnh án chi tiết

7. THE Hệ_Thống_Phân_Tích SHALL bao gồm Luồng_Ngoại_Lệ cho trường hợp patientId không tồn tại trong hệ thống

8. THE Hệ_Thống_Phân_Tích SHALL bao gồm Luồng_Ngoại_Lệ cho trường hợp vòng tay bị khóa (braceletStatus = locked)

9. THE Hệ_Thống_Phân_Tích SHALL bao gồm Luồng_Ngoại_Lệ cho trường hợp không có thông tin người liên hệ khẩn cấp

10. THE Hệ_Thống_Phân_Tích SHALL liệt kê các thành phần tham gia: Người_Cấp_Cứu (Actor), Browser (Actor), EmergencyInfo.jsx (UI), mockData.js (Service), localStorage (Storage)

### Requirement 6: Mô tả use case Xác thực bác sĩ và xem bệnh án

**User Story:** As a developer, I want tài liệu mô tả chi tiết luồng xác thực bác sĩ, so that tôi hiểu rõ cách hệ thống bảo vệ thông tin bệnh án nhạy cảm.

#### Acceptance Criteria

1. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác truy cập trang bệnh án và kiểm tra session authentication

2. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác nhập mật khẩu xác thực bác sĩ

3. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác verify mật khẩu với DOCTOR_PASSWORD trong mockData

4. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác lưu session authentication vào sessionStorage

5. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác hiển thị bệnh án chi tiết (danh sách thuốc, lịch sử khám, chỉ định đặc biệt)

6. THE Hệ_Thống_Phân_Tích SHALL mô tả Luồng_Chính cho thao tác đăng xuất (khóa lại) và xóa session

7. THE Hệ_Thống_Phân_Tích SHALL bao gồm Luồng_Ngoại_Lệ cho trường hợp nhập sai mật khẩu xác thực

8. THE Hệ_Thống_Phân_Tích SHALL bao gồm Luồng_Ngoại_Lệ cho trường hợp patientId không tồn tại

9. THE Hệ_Thống_Phân_Tích SHALL bao gồm Luồng_Ngoại_Lệ cho trường hợp bệnh nhân không có thông tin bệnh án chi tiết

10. THE Hệ_Thống_Phân_Tích SHALL bao gồm Luồng_Ngoại_Lệ cho trường hợp bác sĩ đã xác thực trước đó trong session hiện tại

11. THE Hệ_Thống_Phân_Tích SHALL liệt kê các thành phần tham gia: Bác_Sĩ (Actor), DoctorAuth.jsx (UI), MedicalRecord.jsx (UI), mockData.js (Service), sessionStorage (Storage)

### Requirement 7: Định dạng chi tiết của mỗi bước trong sequence diagram

**User Story:** As a developer, I want mỗi bước trong sequence diagram được mô tả theo chuẩn format nhất quán, so that tôi có thể dễ dàng theo dõi luồng dữ liệu qua các layer.

#### Acceptance Criteria

1. THE Hệ_Thống_Phân_Tích SHALL mô tả mỗi Bước_Tương_Tác theo định dạng: "Bước X: [Actor/Layer nguồn] → [Layer đích]: [Tên action/method]"

2. THE Hệ_Thống_Phân_Tích SHALL bao gồm mô tả chi tiết về dữ liệu được truyền đi trong mỗi bước (parameters)

3. THE Hệ_Thống_Phân_Tích SHALL bao gồm mô tả chi tiết về dữ liệu response trả về từ layer đích

4. THE Hệ_Thống_Phân_Tích SHALL sử dụng code block hoặc inline code để highlight tên method, biến, và giá trị cụ thể

5. THE Hệ_Thống_Phân_Tích SHALL thụt lề (indent) các bước con hoặc sub-flow để thể hiện phân cấp

6. THE Hệ_Thống_Phân_Tích SHALL đánh số thứ tự các bước từ 1 trở đi cho mỗi use case

7. THE Hệ_Thống_Phân_Tích SHALL sử dụng bullet points hoặc numbered list để liệt kê các bước

### Requirement 8: Mô tả luồng ngoại lệ (Alternative Flows)

**User Story:** As a QA engineer, I want tài liệu mô tả rõ ràng các luồng ngoại lệ, so that tôi có thể viết test case cho các trường hợp lỗi và edge case.

#### Acceptance Criteria

1. THE Hệ_Thống_Phân_Tích SHALL tạo subsection "Luồng ngoại lệ" cho mỗi use case có error case

2. THE Hệ_Thống_Phân_Tích SHALL đặt tên cho mỗi luồng ngoại lệ theo format: "Alternative X: [Tên mô tả ngắn gọn]"

3. THE Hệ_Thống_Phân_Tích SHALL mô tả điểm phân nhánh (branching point) từ luồng chính vào luồng ngoại lệ

4. THE Hệ_Thống_Phân_Tích SHALL mô tả điều kiện trigger (condition) cho mỗi luồng ngoại lệ

5. THE Hệ_Thống_Phân_Tích SHALL mô tả các bước xử lý lỗi hoặc recovery trong luồng ngoại lệ

6. THE Hệ_Thống_Phân_Tích SHALL mô tả kết quả cuối cùng của luồng ngoại lệ (error message hiển thị, trạng thái hệ thống)

7. THE Hệ_Thống_Phân_Tích SHALL liệt kê tối thiểu 1 luồng ngoại lệ cho mỗi use case

### Requirement 9: Phân tích theo từng layer (Actor → UI → Service → Storage → Data)

**User Story:** As a system architect, I want tài liệu mô tả rõ ràng responsibility của từng layer, so that tôi hiểu được kiến trúc hệ thống và cách các layer tương tác với nhau.

#### Acceptance Criteria

1. THE Hệ_Thống_Phân_Tích SHALL mô tả interaction từ Actor (người dùng) đến UI_Component (React component)

2. THE Hệ_Thống_Phân_Tích SHALL mô tả interaction từ UI_Component đến Service_Layer (context, utility functions, libraries)

3. THE Hệ_Thống_Phân_Tích SHALL mô tả interaction từ Service_Layer đến Storage (localStorage, sessionStorage)

4. THE Hệ_Thống_Phân_Tích SHALL mô tả data structure được lưu trữ trong Storage

5. THE Hệ_Thống_Phân_Tích SHALL mô tả response flow từ Storage → Service → UI → Actor

6. WHERE một bước chỉ liên quan đến 2 layer liền kề, THE Hệ_Thống_Phân_Tích SHALL mô tả trực tiếp mà không cần liệt kê các layer trung gian

### Requirement 10: Sử dụng định dạng Markdown thuần túy

**User Story:** As a documentation user, I want tài liệu được viết bằng Markdown thuần túy, so that tôi có thể đọc dễ dàng trên bất kỳ trình soạn thảo nào mà không cần công cụ vẽ diagram đặc biệt.

#### Acceptance Criteria

1. THE Hệ_Thống_Phân_Tích SHALL sử dụng cú pháp Markdown chuẩn cho headers (# ## ###)

2. THE Hệ_Thống_Phân_Tích SHALL sử dụng numbered list (1. 2. 3.) hoặc bullet list (- *) để liệt kê các bước

3. THE Hệ_Thống_Phân_Tích SHALL sử dụng code block (```) hoặc inline code (`) để highlight code và technical terms

4. THE Hệ_Thống_Phân_Tích SHALL sử dụng bold (**text**) để làm nổi bật layer name hoặc component name

5. THE Hệ_Thống_Phân_Tích SHALL sử dụng blockquote (>) hoặc note section để highlight thông tin quan trọng

6. THE Hệ_Thống_Phân_Tích SHALL KHÔNG sử dụng các công cụ vẽ diagram như Mermaid, PlantUML, hoặc hình ảnh embedded

7. THE Hệ_Thống_Phân_Tích SHALL tạo table (nếu cần) để so sánh hoặc liệt kê thông tin có cấu trúc

### Requirement 11: Nội dung toàn bộ bằng Tiếng Việt

**User Story:** As a Vietnamese developer, I want tài liệu được viết hoàn toàn bằng Tiếng Việt, so that tôi và team có thể đọc hiểu nhanh chóng mà không cần dịch.

#### Acceptance Criteria

1. THE Hệ_Thống_Phân_Tích SHALL viết tất cả tiêu đề, mô tả, và giải thích bằng Tiếng Việt

2. WHERE technical terms không có từ Tiếng Việt tương đương, THE Hệ_Thống_Phân_Tích SHALL giữ nguyên thuật ngữ tiếng Anh và thêm giải thích Tiếng Việt trong ngoặc đơn

3. THE Hệ_Thống_Phân_Tích SHALL sử dụng Tiếng Việt cho tên use case và tên section

4. THE Hệ_Thống_Phân_Tích SHALL giữ nguyên tên file, class, method, và variable name bằng tiếng Anh trong code block

5. THE Hệ_Thống_Phân_Tích SHALL sử dụng dấu câu và ngữ pháp Tiếng Việt chuẩn

### Requirement 12: Bao gồm metadata và thông tin tổng quan

**User Story:** As a project manager, I want tài liệu có phần metadata và tổng quan, so that tôi có thể nhanh chóng hiểu được scope và mục đích của tài liệu mà không cần đọc chi tiết.

#### Acceptance Criteria

1. THE Hệ_Thống_Phân_Tích SHALL bao gồm phần "Metadata" với thông tin: Tên dự án, Version, Ngày tạo, Người tạo

2. THE Hệ_Thống_Phân_Tích SHALL bao gồm phần "Giới thiệu" mô tả mục đích và phạm vi của tài liệu

3. THE Hệ_Thống_Phân_Tích SHALL bao gồm phần "Danh sách Use Cases" liệt kê tất cả use case được phân tích

4. THE Hệ_Thống_Phân_Tích SHALL bao gồm phần "Quy ước ký hiệu" giải thích các ký hiệu và format được sử dụng trong tài liệu

5. THE Hệ_Thống_Phân_Tích SHALL bao gồm phần "Kiến trúc hệ thống" mô tả tổng quan về các layer và thành phần chính

6. THE Hệ_Thống_Phân_Tích SHALL tạo Table of Contents (mục lục) với links đến các section chính

### Requirement 13: Tính đầy đủ và chính xác của thông tin

**User Story:** As a technical reviewer, I want tài liệu phản ánh chính xác code thực tế, so that tôi có thể tin tưởng vào tài liệu khi review hoặc onboard member mới.

#### Acceptance Criteria

1. THE Hệ_Thống_Phân_Tích SHALL mô tả đúng tên file và đường dẫn của các UI_Component trong source code

2. THE Hệ_Thống_Phân_Tích SHALL mô tả đúng tên function và method được sử dụng trong các component

3. THE Hệ_Thống_Phân_Tích SHALL mô tả đúng data structure được lưu trong localStorage và sessionStorage

4. THE Hệ_Thống_Phân_Tích SHALL mô tả đúng các state và props của React component liên quan

5. THE Hệ_Thống_Phân_Tích SHALL mô tả đúng các error message và error handling logic

6. THE Hệ_Thống_Phân_Tích SHALL liệt kê đầy đủ tất cả use case chính của hệ thống MedLink Band (ít nhất 5 use case: Login, Quản lý bệnh nhân, Tạo QR, Xem thông tin cấp cứu, Xác thực bác sĩ)

7. WHEN một use case có nhiều hơn 3 luồng ngoại lệ, THE Hệ_Thống_Phân_Tích SHALL liệt kê ít nhất 3 luồng ngoại lệ quan trọng nhất

### Requirement 14: Khả năng bảo trì và cập nhật

**User Story:** As a documentation maintainer, I want tài liệu có cấu trúc dễ cập nhật, so that tôi có thể thêm hoặc sửa use case mới mà không làm ảnh hưởng các phần khác.

#### Acceptance Criteria

1. THE Hệ_Thống_Phân_Tích SHALL tổ chức mỗi use case thành một section độc lập với header riêng

2. THE Hệ_Thống_Phân_Tích SHALL sử dụng anchor links trong Table of Contents để dễ dàng navigate

3. THE Hệ_Thống_Phân_Tích SHALL đặt tên section theo pattern nhất quán: "Use Case X: [Tên Use Case]"

4. THE Hệ_Thống_Phân_Tích SHALL bao gồm phần "Version History" hoặc "Changelog" ở cuối tài liệu để tracking các thay đổi

5. THE Hệ_Thống_Phân_Tích SHALL để lại comment hoặc note section nếu có phần nào cần cập nhật trong tương lai

### Requirement 15: Khả năng đọc và hiểu (Readability)

**User Story:** As a new team member, I want tài liệu dễ đọc và dễ hiểu, so that tôi có thể onboard nhanh chóng mà không cần hỗ trợ từ senior developer.

#### Acceptance Criteria

1. THE Hệ_Thống_Phân_Tích SHALL sử dụng ngôn ngữ đơn giản và rõ ràng cho mỗi bước mô tả

2. THE Hệ_Thống_Phân_Tích SHALL tránh sử dụng jargon hoặc thuật ngữ phức tạp mà không giải thích

3. THE Hệ_Thống_Phân_Tích SHALL bao gồm ví dụ cụ thể (example data) khi mô tả data structure

4. THE Hệ_Thống_Phân_Tích SHALL sử dụng khoảng trắng và line breaks hợp lý để tăng khả năng đọc

5. THE Hệ_Thống_Phân_Tích SHALL giới hạn độ dài mỗi bước mô tả trong khoảng 1-3 câu

6. THE Hệ_Thống_Phân_Tích SHALL sử dụng emoji hoặc icon (nếu phù hợp) để làm nổi bật các phần quan trọng hoặc cảnh báo

7. THE Hệ_Thống_Phân_Tích SHALL bao gồm phần "Tổng kết" ở cuối mỗi use case để tóm tắt luồng chính và key takeaways
