using EmployeeManagmentAPI.Models;

namespace EmployeeManagmentAPI
{
    public class HelperEM
    {
        public static bool CheckContent(IUser employee)
        {
            if (employee == null || (employee.Email == "" || employee.IdCard == 0 || employee.Name == "" || employee.Password == "" || employee.Surname == "")) 
            {
                return false;
            }

            return true;
        }

        public static bool CheckLoginContent(LogUser user)
        {
            if (user == null || (user.IdCard <= 0 || user.Password == ""))
            {
                return false;
            }

            return true;
        }

        public static bool CheckWorkContent(Work work)
        {
            string workTittle = work.WorkName.Trim();
            work.WorkName = workTittle;

            if (!(string.IsNullOrEmpty(work.WorkName) || work.WorkDescription == ""))
            {
                return true;
            }
            return false;
        }
    }
}
